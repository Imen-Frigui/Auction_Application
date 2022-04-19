import express from 'express'
import { getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts, makeBid, endBiding, deleteBid, createAuction} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//get all products ___ GET /api/products PUBLIC
router.route('/').post(protect, createAuction).get(getProducts).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect,createProductReview)

router.get('/top', getTopProducts)

//get SINGLE products ___ GET /api/product:/ID PUBLIC

router.route('/:id').post(protect, endBiding).get(getProductById).delete(protect, admin , deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/bid/:bid_id').delete(protect, deleteBid)
router.route('/:id/bid').post(protect, makeBid)



export default router