import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, MAKE_HELPFUL_REVIEW_FAIL, MAKE_HELPFUL_REVIEW_REQUEST, MAKE_HELPFUL_REVIEW_SUCCESS, USER_CREATE_REVIEW_FAIL, USER_CREATE_REVIEW_REQUEST, USER_CREATE_REVIEW_SUCCESS} from '../constants/reviewConstants'
import axios from "axios"


export const listReviewsForUser = (id) => async(dispatch) => {
    try {
        dispatch ({ type: GET_REVIEWS_REQUEST})
        const { data } = await axios.get(`/api/review/${id}`)
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createUserReview = (userId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/review/${userId}`, review, config)
  
      dispatch({
        type: USER_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
        dispatch({
            type: USER_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
  }

  export const makeReviewHelpful = (id) => async (dispatch, getState) => {
    try {
      dispatch({
          type: MAKE_HELPFUL_REVIEW_REQUEST
      })

      const { userLogin: {userInfo} } = getState()

      const config = {
          headers: {
              Authorization : `Bearer ${userInfo.token}`,
          },
      }
      
      const {data} = await axios.post(`/api/review/${id}/mark`, id, config)
  
      dispatch({
        type: MAKE_HELPFUL_REVIEW_SUCCESS,
        payload: data
      })
    } catch (error) {
        dispatch({
            type: MAKE_HELPFUL_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
  }

  