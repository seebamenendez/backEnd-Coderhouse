import * as fs from 'fs';
const fsp = fs.promises;
import idGenerator from '../helpers/idGenerator.js';
import Product from '../models/Product.js';

// Data --------------------------------->
const productsDB = './db/products.txt';
const utf = 'utf-8';

// Helpers --------------------------------->
const readDB = async () => {
    let database = await fsp.readFile(productsDB, utf);
    if (database == ""){
        database = "[]";
    }
    return JSON.parse(database);
}

const writeDB = async (data) => {
    await fsp.writeFile(productsDB, JSON.stringify(data), utf);
}

// Actions --------------------------------->
export const getProducts = async (req, res) => {
    const products = await readDB ();
    return res.json({
        products
    })
}

export const addProduct = async (req, res) => {
    const { name, description, code, photo, price, stock } = req.body;
    const listOfProducts = await readDB();
    const newProduct = new Product(
        idGenerator(),
        Date.now(),
        name,
        description,
        code,
        photo, 
        price, 
        stock)
    listOfProducts.push(newProduct);
    try {
        await writeDB(listOfProducts);
        return res.json({
            listOfProducts
        })
    } catch (error) {
        console.log(error);
    }
}

export const getProduct = async (req, res) => {
    const {id} = req.params
    const listOfProducts = await readDB();
    const findProductById = await listOfProducts.find(product => product.id === id);
    if (!findProductById){
        const error = new Error('Product not found')
        return res.status(404).json({ msg: error.message })
    }
    
    res.json(findProductById);
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    let listOfProducts = await readDB();
    const filterListById = await listOfProducts.filter(product => product.id !== id);
    if (filterListById.length === listOfProducts.length){
        const error = new Error('Product not found')
        return res.status(404).json({ msg: error.message })
    }

    try {
        await writeDB(filterListById)
        res.json ({msg: 'project deleted successfully'})
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (req, res) => {
    const {id} = req.params; // Get ID from params
    let listOfProducts = await readDB(); // Read database
    const findProductById = await listOfProducts.find (product => product.id === id)

    if(!findProductById){
        const error = new Error ('Product not found')
        return res.status(404).json({ msg: error.message })
    }

    findProductById.name = req.body.name || findProductById.name;
    findProductById.description = req.body.description || findProductById.description;
    findProductById.code = req.body.code || findProductById.code;
    findProductById.photo = req.body.photo || findProductById.photo;
    findProductById.price = req.body.price || findProductById.price;
    findProductById.stock = req.body.stock || findProductById.stock;

    const newListOfProducts = await listOfProducts.filter(product => product.id !== id)
    newListOfProducts.push(findProductById)

    try {
        await writeDB(newListOfProducts)
        res.json ({newListOfProducts})
    } catch (error) {
        console.log(error)
    }
}