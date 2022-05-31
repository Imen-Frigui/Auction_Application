import express from 'express'
import { profile, authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, googlelogin} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect,admin, getUsers)
router.post('/login', authUser)
router.route('/googlelogin').post(googlelogin)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router.route('/profile/:id').get(profile)

export default router