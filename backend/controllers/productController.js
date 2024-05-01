import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import multer from "multer";
import cloudinary from 'cloudinary';
import { body } from "express-validator";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    //? Implement pagination
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    //! implement search function
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments({...keyword});

    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product){
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });

// @desc Create a  product
// @route POST /api/products
// @access Private / Admin
const createProduct = asyncHandler([
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("countInStock").notEmpty().isNumeric().withMessage("Count in stock is required and must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
],upload.array("imageFiles", 6),
    async (req, res) => {
    try {
        const imageFiles = req.files;
        const newProduct = req.body;

        const imageUrls = await uploadImages(imageFiles);

        //!2. if upload is successful add the urls to the new product object
        newProduct.imageUrls = imageUrls;
        newProduct.user = req.user._id;

        //!3. save the new product object to the database
        const product = new Product(newProduct);
        await product.save();
        
         //!4. return a 201 status code and the new product object
        res.status(201).json(product);

    } catch (error) {
        console.log("Error creating new product: " + error);
        res.status(500)
        throw new Error('Something went wrong')
    }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    //? find the product we are deleting
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted' })
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
});

// @desc Create a new Review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    //? find the product we are creating review for
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = 
            product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
});

// @desc Get Top Rated Products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
});

async function uploadImages(imageFiles) {
    //!1. upload the images to cloudinary
   //! uploading one image at a time
   const uploadPromises = imageFiles.map(async (image) => {
     //! encode image as base 64 string
     const b64 = Buffer.from(image.buffer).toString("base64");
     let dataURI = "data:" + image.mimetype + ";base64," + b64;
     const res = await cloudinary.v2.uploader.upload(dataURI);
     return res.url;
   });
 
   const imageUrls = await Promise.all(uploadPromises);
   return imageUrls;
 }


export { 
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
};