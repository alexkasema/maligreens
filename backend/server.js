import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

import products from './data/products.js';


const port =process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id)
    res.json(product);
})

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