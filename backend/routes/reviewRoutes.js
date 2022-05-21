import express from 'express'
import { createReview, deleteReview, getReviewById, getReviewsForUserId, getReviewsWrittenByUserId, markReviewAsHelpful, updateReview } from '../controllers/reviewController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(protect, getReviewsWrittenByUserId)

// @route    POST api/review/:id
// @desc     Create a review for a user
// @access   Private
router.route('/:id')
    .post(protect, createReview)
    .get(getReviewsForUserId)
    .delete(protect,deleteReview)
    .put(protect, updateReview)
    
router.route('/:id/mark')
    .post(protect, markReviewAsHelpful)



    
router.route('/:id/user')

    .get(protect, getReviewById)


export default router