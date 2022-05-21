import AsyncHandler from 'express-async-handler'
import Review from '../models/reviewModel.js'




const createReview = AsyncHandler(async (req, res) => {
    const { title, text, rating } = req.body

  
    const review = new Review({
        writtenBy : req.user._id,
        writtenFor : req.params.id,
        title,
        text,
        rating
    })
    
    const createdReview = await review.save()
    res.status(200).send(createdReview)
  })


const getReviewById = AsyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.status(200).json({ review })
  })

const getReviewsForUserId = AsyncHandler(async (req, res) => {
    const review = await Review.find({ writtenFor: req.params.id }).sort({
      helpfulCount: -1
    })
    if(review){
        res.json({review})
    }else{
        throw new Error('No review Found')
    }
})

const getReviewsWrittenByUserId = AsyncHandler(async (req, res) => {
    const reviews = await Review.find({ writtenBy: req.user.id })
    res.status(200).send(reviews)
  })



const deleteReview = AsyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
  
    if (!review) {
      return next(new AppError('No review by this ID', 404));
    }
  
    if (review.writtenBy.toString() === req.user.id) {
      await review.remove();
      return res.status(200).json(review);
    } else {
      return next(new AppError("Cannot delete a review you didn't write", 400));
    }
  });
  
const updateReview = AsyncHandler(async (req, res) => {
    const review = await Review.findOneAndUpdate(
      { writtenBy: req.user.id },
      req.body,
      { returnOriginal: false }
    );
    return res.status(200).json(review);
  });
  
const markReviewAsHelpful = AsyncHandler(async (req, res) => {
    let review = await Review.findById(req.params.id);
  
    const found = review.markedAsHelpful.some(el => el.user == req.user.id);
  
    if (!found) {
      review.markedAsHelpful.push({ user: req.user.id });
      review.helpfulCount = review.helpfulCount + 1;
    }
  
    await review.save();
  
    res.status(200).json({ review });
  });
   

export  {createReview, getReviewById, getReviewsForUserId, getReviewsWrittenByUserId, deleteReview, updateReview, markReviewAsHelpful}