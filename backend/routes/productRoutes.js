import express from 'express'
import { getProdutsByUser,getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts, makeBid, endBiding, deleteBid, createAuction, getActiveListingsByUser, getInactiveListingsByUser, updateProductUser, endExpiredProducts, searchByQueryType} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//get all products ___ GET /api/products PUBLIC
router.route('/').post(protect, createAuction).get(endExpiredProducts,getProducts)
router.route('/p').get(endExpiredProducts)
//router.route('/end').get(endExpiredProducts)
router.route('/:id/reviews').post(protect,createProductReview)

router.post('/search', searchByQueryType)

router.get('/top', getTopProducts)

//get SINGLE products ___ GET /api/product:/ID PUBLIC

router.route('/:id').put(protect, updateProductUser).
post(protect, endBiding)
.get(getProductById)
.delete(protect, admin , deleteProduct)
.put(protect, admin, updateProduct)

router.route('/:id/bid/:bid_id').delete(protect, deleteBid)

router.route('/:id/bid').post(protect, makeBid)

router.route('/:user_id/posts').get(getProdutsByUser)
router.route('/:user_id/active').get(protect, getActiveListingsByUser)
router.route('/:user_id/inactive').get(protect, getInactiveListingsByUser)


export default router