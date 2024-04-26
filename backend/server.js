import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';``

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


const port =process.env.PORT || 5000;
const app = express();

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