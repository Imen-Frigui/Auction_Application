import express from 'express'
import { newMessage, getMessage } from '../controllers/messageController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//get all category ___ GET /api/categori PUBLIC
router.route('/').post(newMessage)
router.route('/:conversationId').get(getMessage)
                // .post(protect, admin, createCategory)
        
//router.route('/:id').put(protect, admin, updateCategory).delete(protect, admin, deleteCategory).get(protect, admin, getCategoryById)



export default router