import express from 'express'
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from '../controllers/categoryController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()

//get all category ___ GET /api/categori PUBLIC
router.route('/').get(getCategories)
                 .post(protect, admin, createCategory)
        
router.route('/:id').put(protect, admin, updateCategory).delete(protect, admin, deleteCategory).get(protect, admin, getCategoryById)



export default router