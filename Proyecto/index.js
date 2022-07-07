import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

// Config
const app = express();
const port = process.env.PORT || 8080;
dotenv.config();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routing configuration
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, ()=>{
    console.log (`Server run on port ${port}`);
})