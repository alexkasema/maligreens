import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';``

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const port =process.env.PORT || 5000;
const app = express();
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
//! Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//! WE can look it up in paypal API docs
app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

}

start();