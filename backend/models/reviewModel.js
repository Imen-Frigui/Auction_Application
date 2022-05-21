import mongoose from 'mongoose'
import User from './userModel.js'


const reviewSchema = mongoose.Schema({
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  writtenFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  writtenAt: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    required: true
  },
  helpfulCount: {
    type: Number,
    required: true,
    default: 0
  },
  markedAsHelpful: [
    {
      user: { type: String, required: true },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.writtenFor); //this points to current review, this.constructor is Review model
});

reviewSchema.pre(/^updateOne/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^updateOne/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.writtenFor);
});

reviewSchema.statics.calcAverageRatings = async function(userId) {
  const stats = await this.aggregate([
    {
      $match: { writtenFor: userId }
    },
    {
      $group: {
        _id: '$writtenFor',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  if (stats.length > 0) {
    await User.findByIdAndUpdate(userId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5 //default value
    });
  }
}

const Review = mongoose.model ('Review', reviewSchema)
export default Review