import express from 'express';
import Product from '../models/productModel.js';
import multer from "multer";
import cloudinary from 'cloudinary';
import { 
    getProducts, 
    getProductById,
    createProduct,

} from '../controllers/productController.js';
import { body } from "express-validator";

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();



const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });

router.post('/',
    protect,
    admin,[
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
    }
)

router.route('/').get(getProducts)

router.route('/:id').get(getProductById);

router.put(
  "/:id",
  protect,
  admin,
  upload.array("imageFiles"),
  async (req, res) => {
    try {
      const updatedProduct = req.body;

      const product = await Product.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        updatedProduct,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files;
      const updatedImageUrls = await uploadImages(files);

      product.imageUrls = [
        ...updatedImageUrls,
        ...(updatedProduct.imageUrls || []),
      ];

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

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

export default router;