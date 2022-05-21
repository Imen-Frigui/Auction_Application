import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
      },
    currentPrice: {
         type: Number },
    startPrice: {
        type: Number,
        required: true,
        default: 0
     },
    minIncrement: {
        type: Number,
        required: true,
        default: 0
  },
    endDate: {
    type: Date,
    required: true
  },
    condition: {
    type: String,
    enum: ['unspecified', 'used', 'new'],
    default: 'unspecified'
  },
  bids: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      bid: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    description:{
        type: String,
    },
    active: { type: Boolean, default: true },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Category'
    }

},{timestamps:true,})

productSchema.pre('save', async function(next) {
    if (!this.currentPrice) {
      this.currentPrice = this.startPrice;
    }
    next();
  });

const Product = mongoose.model ('Product', productSchema)
export default Product