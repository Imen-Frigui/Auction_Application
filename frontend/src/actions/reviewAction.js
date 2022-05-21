import {G, GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS} from '../constants/reviewConstants'
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