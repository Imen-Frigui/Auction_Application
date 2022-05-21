import express from 'express'
import { createReview, getReviewById, getReviewsForUserId, getReviewsWrittenByUserId } from '../controllers/reviewController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

// @route    POST api/review/:id
// @desc     Create a review for a user
// @access   Private
router.route('/:id')
    .post(protect, createReview)
    .get(getReviewsForUserId)

router.route('/')
    .get(protect, getReviewsWrittenByUserId)

    
router.route('/:id/user')

    .get(protect, getReviewById)


export default router