import Cart from '../models/Cart.js';

//Helpers
import idGenerator from '../helpers/idGenerator.js';
import readDB from '../helpers/readDB.js';
import writeDB from '../helpers/writeDB.js';
import checkProduct from '../helpers/checkProduct.js'

// Files
const cartsDB = './db/carts.txt';
const productsDB = './db/products.txt';

// Create a new Cart -------------------------------
export const createCart = async(req, res) =>{
    let {products} = req.body;

    const listOfCart = await readDB (cartsDB)
    console.log(listOfCart)
    if(!products){
        products = [];
    }

    const newCart = new Cart(
        idGenerator(),
        Date.now(),
        products
    )

    listOfCart.push(newCart);

    try {
        await writeDB(cartsDB, listOfCart)
        return res.json({msg: `Cart created successfully with id: ${newCart.id}`}
        )
    } catch (error) {
        console.log(error);
    }   
}

// Delete a cart -------------------------------
export const deleteCart = async (req, res) =>{
    const {id} = req.params;
    const listOfCart = await readDB (cartsDB);
    const newListOfCart = listOfCart.filter (cart => cart.id != id)

    if (newListOfCart.length === listOfCart.length) {
        const error = new Error ('Something went wrong, cart not found')
        return res.status(404).json({msg: error.message})
    }

    try {
        await writeDB(cartsDB, newListOfCart)
        res.json ({msg: 'Cart deleted successfully'})
    } catch (error) {
        console.log(error)
    }

}

// Get products from a cart -------------------------------
export const getCartProducts = async(req, res) =>{
    const { id } = req.params;
    const listOfCart = await readDB (cartsDB);
    const findCartById = listOfCart.find(cart => cart.id === id);
    
    if (!findCartById){
        const error = new Error ("Cart not found");
        return res.status(404).json({msg: error.message})
    }

    res.json(findCartById.products);
}

// Get list of carts -------------------------------
export const getCarts = async (req, res) =>{
    const listOfCart = await readDB (cartsDB);
    res.json(listOfCart)
}


// Add product with its ID to a selected cart -------------------------------
export const addProductInCart = async (req, res) =>{
    const { id, id_prod } = req.params;

    // Get lists of products and carts from database;
    const listOfCart = await readDB (cartsDB)
    const listOfProduct = await readDB (productsDB)

    // Find product and cart by ID;
    const findCartById = listOfCart.find(cart => cart.id === id);
    const findProductById = listOfProduct.find(product => product.id === id_prod);

    if(!findCartById || !findProductById){
        const error = new Error ("Something not found");
        return res.status(404).json({msg: error.message});
    }

    // Check if the product has already been added to the cart
    const checkProductInCart = findCartById.products.some(prod => prod.id === id_prod)

    if (checkProductInCart) {
        const error = new Error ('Product already exist in the cart');
        return res.status(400).json({msg: error.message});
    }

    // Add select product in cart and add cart in the list of carts;
    await findCartById.products.push(findProductById);
    const updateCart = listOfCart.filter (cart => cart.id != id)
    updateCart.push (findCartById)

    try {
        await writeDB (cartsDB, updateCart)
        res.json({updateCart})
    } catch (error) {
        console.log(error);
    }
}

// Delete product from a cart -------------------------------
export const deleteProductInCart = async (req, res) =>{
    const { id, id_prod } = req.params;

    // Get lists of carts from database;
    const listOfCart = await readDB (cartsDB);

    // Find cart by ID;
    const findCartById = listOfCart.find(cart => cart.id === id);
    
    if(!findCartById){
        const error = new Error ("Cart not found");
        return res.status(404).json({msg: error.message});
    }

    // Check if product is already in cart;
    let cartProducts = findCartById.products

    if(!checkProduct(cartProducts, id_prod)){
        const error = new Error ('Product not found in the cart');
        return res.status(404).json({msg: error.message});
    }

    // Update products;
    cartProducts = cartProducts.filter (product => product.id != id_prod);
    findCartById.products = cartProducts;

    // Update list of carts;
    const updateListOfCart = listOfCart.filter (cart => cart.id != id)
    updateListOfCart.push(findCartById);

    try {
        await writeDB(cartsDB, updateListOfCart);
        res.json(updateListOfCart)
    } catch (error) {
        console.log(error);       
    }

}

