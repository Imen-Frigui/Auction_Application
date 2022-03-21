import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//get all products ___ GET /api/products PUBLIC
const getProducts = AsyncHandler(async(req, res) => {
    const products = await Product.find({})
//throw new Error('Error')
res.json(products)
})


//get SINGLE products ___ GET /api/product:/ID PUBLIC
const getProductById = AsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        throw new Error('Product not found')
    }
})

export {getProductById, getProducts}