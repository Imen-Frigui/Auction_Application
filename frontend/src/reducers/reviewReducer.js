import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS } from '../constants/reviewConstants'


  export const listReviewsForUserreducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case GET_REVIEWS_REQUEST:
        return { loading: true, reviews: [] }
      case GET_REVIEWS_SUCCESS:
        return {
          loading: false,
          reviews: action.payload.reviews,
        }
      case GET_REVIEWS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }