import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, MAKE_HELPFUL_REVIEW_FAIL, MAKE_HELPFUL_REVIEW_REQUEST, MAKE_HELPFUL_REVIEW_RESET, MAKE_HELPFUL_REVIEW_SUCCESS, USER_CREATE_REVIEW_FAIL, USER_CREATE_REVIEW_REQUEST, USER_CREATE_REVIEW_RESET, USER_CREATE_REVIEW_SUCCESS } from '../constants/reviewConstants'


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

  export const userReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case USER_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case USER_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case USER_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }

  export const makeReviewHelpfulReducer = (state = {}, action) => {
    switch (action.type) {
      case MAKE_HELPFUL_REVIEW_REQUEST:
        return { loading: true }
      case MAKE_HELPFUL_REVIEW_SUCCESS:
        return { loading: false, success: true, review:action.payload }
      case MAKE_HELPFUL_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case MAKE_HELPFUL_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }

