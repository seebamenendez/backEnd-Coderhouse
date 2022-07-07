import {Router} from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
} from '../controllers/productController.js'

const router = Router();

router.route ('/')
    .get(getProducts)
    .post (checkAuth, addProduct)

router.route('/:id')
    .get(checkAuth, getProduct)
    .put(checkAuth, updateProduct)
    .delete(checkAuth, deleteProduct);

export default router;