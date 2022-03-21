import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import genrateToken from '../utils/genrateToken.js'

//auth User & getoken ___ GET /api/users/public PUBLIC
const authUser = AsyncHandler(async(req, res) => {
    const { email, password} = req.body
    const user =await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user._id)
        })

    }else {
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})

//register User & getoken ___ POST /api/users PUBLIC
const registerUser = AsyncHandler(async(req, res) => {
    const { name, email, password} = req.body
    
    const userExists = await User.findOne({email})
 
    if(userExists){
        res.status(400)
        throw new Error ('User Already exists')
    }

    const user = await User.create({name, email, password})

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('Invalid user data')
    }
})


//GEt user profile ___ GET /api/users/profile PRIVATE
const getUserProfile = AsyncHandler(async(req, res) => {
const user = await User.findById(req.user._id)  
if (user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin})

}else{
    res.status(404)
    throw new Error('User not found')
}
})

export { authUser, getUserProfile, registerUser}