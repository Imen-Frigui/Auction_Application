import express from 'express'
import AsyncHandler from 'express-async-handler'
import { getProductById, getProducts} from '../controllers/productController.js'

const router = express.Router()



//get all products ___ GET /api/products PUBLIC
router.route('/').get(getProducts)


//get SINGLE products ___ GET /api/product:/ID PUBLIC

router.route('/:id').get(getProductById)

export default router