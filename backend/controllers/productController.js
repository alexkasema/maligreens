import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import multer from "multer";
import cloudinary from 'cloudinary';
import { body } from "express-validator";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
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
};