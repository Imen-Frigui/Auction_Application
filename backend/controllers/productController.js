import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//get all products ___ GET /api/products PUBLIC
const getProducts = AsyncHandler(async(req, res) => {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword ?{
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    
    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1)).populate('user')

//throw new Error('Error')
  res.json({products, page, pages:Math.ceil(count /pageSize)})
})


//get SINGLE products ___ GET /api/product:/ID PUBLIC
const getProductById = AsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id).populate('user')
    if(product){
        res.json(product)
    }else{
        throw new Error('Product not found')
    }
})
//delete SINGLE product ___ DELETE /api/product:/ID PRIVATE/ADMIN
const deleteProduct = AsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id).populate('user')
    if(product){
        await product.remove()
        res.json({message: 'product removed'})
    }else{
        throw new Error('Product not found')
    }
})
//create SINGLE product ___ POST /api/products PRIVATE/ADMIN
const createProduct = AsyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample',
        bid:0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'brand',
        category: 'cat',
        countDown: 0,
        numReviwes: 0,
        description: 'sample desc'
    }).populate('user')
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
//update SINGLE product ___ PUT /api/products/:id PRIVATE/ADMIN
const updateProduct = AsyncHandler(async(req, res) => {
    const {name, bid, category,description,image, brand,countDown} = req.body

    const product = await Product.findById(req.params.id).populate('user')

    if(product){
        product.name = name
        product.bid = bid
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countDown = countDown


        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error ('')
    }
   
})

//create New review ___ PUT /api/products/:id/reviews PRIVATE
const createProductReview = AsyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id).populate('user')
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      ).populate('user')
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

  
//Get top reated producted ___ PUT /api/products/top PUBLIC
const getTopProducts = AsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(5).populate('user')
    res.json(products)
  })


//Make a bid ___ POST /api/products/:id/bid PRIVATE/USER
const makeBid = AsyncHandler(async (req, res) => {
    const bid = {
      user: req.user.id,
      bid: req.body.bid
    }
  
    const product = await Product.findById(req.params.id).populate('user')
  
    if (!product) {
        res.status(404)
      throw new Error('Product not found')
    }
  
    if (!product.active) {
        res.status(404)
        throw new Error('Cannot bid product expired')
    }
    let maxBid = Math.max(...product.bids.map(P => P.bid), 0);
  
    if (!maxBid) {
        maxBid = product.startPrice
    }
  
    if (req.body.bid > product.minIncrement + maxBid) {
        product.bids.push(bid)
        product.currentPrice = req.body.bid
        const madeBid = await product.save()
        res.status(201).json(madeBid)
    } else {
        res.status(404)
        throw new Error("Your bid isn't high enough")
    }
  });
  
//Delete a Bid ___ DELETE/api/products/:product_id/bid/bid_id PRIVATE
const deleteBid = AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.product_id).populate(
        'user'
    )
    product.bids = product.bids.filter(bid => {
        return bid._id != req.params.bid_id || bid.user.toString() != req.user.id
    })
    const maxBid = Math.max(...product.bids.map(p => p.bid), 0)
    product.currentPrice = maxBid
    const deletedBid = await product.save()
    res.status(201).json(deletedBid)
  });
  
//End auction ___ POST /api/products/:id PRIVATE
const endBiding = AsyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (product.user.toString() === req.user.id) {
        product.active = false
    } else {
        res.status(404)
        throw new Error('You do not own the product to end the biding')
    }
    const endedBid = await product.save()
    res.status(201).json(endedBid)
  });


//Create an auction by User  POST api/products PRIVATE
const createAuction = AsyncHandler (async(req, res) =>{
    const Auction = {
        ...req.body,
        user: req.user.id,
        startPrice:req.body.startPrice,
        minIncrement: req.body.minIncrement}
    if(Auction.minIncrement % 1 !==0 && !!Auction.minIncrement && Auction.startPrice % 1 !==0 && !!Auction.startPrice)    {
        res.status(400)
        throw new Error('Money fields are required')
    }
    if (!(Auction.endDate && Auction.name && Auction.description )) {
        res.status(401)
        throw new Error('fields are required')
    }
    let newAuction = await Product.create(Auction)
    newAuction = await newAuction.populate('user')
    res.status(201).json(newAuction)
})  



const getActiveListingsByUser = AsyncHandler(async (req, res) => {
    const products = await Product.find({
      user: req.params.user_id,
      active: true
    }).populate('user');
  
    res.status(200).json({ products });
  });
  
  const getInactiveListingsByUser = AsyncHandler(async (req, res) => {
    const products = await Product.find({
      user: req.params.user_id,
      active: false
    }).populate('user');
  
    res.status(200).json({ products });
  });

  //update SINGLE product ___ PUT /api/products/:id PRIVATE/ADMIN
const updateProductUser = AsyncHandler(async(req, res) => {
  const {name, bid, category,description,image, brand,countDown} = req.body

  const product = await Product.findById(req.params.id).populate('user')

  if(product){
      product.name = name
      product.bid = bid
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countDown = countDown
      const updatedProduct = await product.save()
      res.json(updatedProduct)
  }else{
      res.status(404)
      throw new Error ('')
  }
 
})

const endExpiredProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('user')
  products.forEach(async(product) => {
    await Product.find({}).populate('user')
    if(product.endDate.getDate()< Date.now()){
      product.active= false
      if (product.bids.length > 0) {
      var winningBid = product.bids.reduce((max,product) => {
        max.bid > product.bid ? max : product
      })
    }
    }else{ var winningBid = null}
    winningBid === null ? (product.winner= null ) : (product.winner = winningBid.user)
    let updatedProduct = await product.save()
    updatedProduct = await updatedProduct.populate('user')
      res.status(200).json(updatedProduct)
  })

})


const getUsersWonListings = AsyncHandler(async (req, res) => {
  const products = await Product.find({
    winner: req.user.id,
    active: false
  }).populate('user');
  res.status(200).json({ products });
});

export {getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts, makeBid, endBiding, deleteBid, createAuction, getActiveListingsByUser, getInactiveListingsByUser, updateProductUser, endExpiredProducts,getUsersWonListings}