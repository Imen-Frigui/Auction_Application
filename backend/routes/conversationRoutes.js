import express from 'express'
import {protect, admin} from '../middleware/authMiddleware.js'
import {newConversation, getConversation} from '../controllers/conversationController.js'

const router = express.Router()

//get all category ___ GET /api/categori PUBLIC
router.route('/').post(newConversation)
router.route('/:userId').get(getConversation)        
//router.route('/:id').put(protect, admin, updateCategory).delete(protect, admin, deleteCategory).get(protect, admin, getCategoryById)



export default router