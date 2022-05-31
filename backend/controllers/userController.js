import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import genrateToken from '../utils/genrateToken.js'
import Product from '../models/productModel.js'
import { OAuth2Client } from 'google-auth-library' 

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

//Update user profile ___ PUT /api/users/profile PRIVATE
const updateUserProfile = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)  
    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
    
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genrateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    })

    //GEt all user ___ GET /api/users/profile PRIVATE/Admin
const getUsers = AsyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)  
    
    })
    
    //DELET  user ___ DELETE /api/users/:id PRIVATE/Admin
const deleteUser = AsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)
      
        if (user) {
          await user.remove()
          res.json({ message: 'User removed' })
        } else {
          res.status(404)
          throw new Error('User not found')
        }
      })

    //GEt user By ID ___ GET /api/users/:id PRIVATE/Admin
const getUserById = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.json(user)       
    }else{
        res.status(404)
        throw new Error('User not found') 
    }
})  

//Update user  ___ PUT /api/users/:id PRIVATE ADMIN
const updateUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin //user.isAdmin 
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  const profile = AsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.json(user)      
    }else{
        res.status(404)
        throw new Error('User not found') 
    }
})   


const client = new OAuth2Client('554222349653-ffn9397f9atsd5farm8dpeaf2slbg71t.apps.googleusercontent.com')
const googlelogin = (req, res) => {
    const { idToken } = req.body;
  
    client
      .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
      .then((response) => {
        const { email_verified, name, email } = response.payload;
  
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
              });
              const { _id, email, name } = user;
              return res.json({
                token,
                user: { _id, email, name }
              });
            } else {
              const password = email + process.env.JWT_SECRET;
  
              user = new User({ name, email, password });
              user
                .save((err, data) => {
                  if (err) {
                    return res.status(400).json({
                      error: "User signup failed with google"
                    });
                  }
                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                  );
                  const { _id, email, name } = data;
  
                  return res.json({
                    token,
                    user: { _id, email, name }
                  });
                })
                .catch((err) => {
                  return res.status(401).json({
                    message: "signup error"
                  });
                });
            }
          });
        } else {
          return res.status(400).json({
            error: "Google login failed. Try again"
          });
        }
      });
  };
  
export { profile,authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, googlelogin}