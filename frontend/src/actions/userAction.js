import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from '../constants/userConstants'

export const login = (email , password) => async (dispatch)=> {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} =await axios.post('/api/users/login', {email, password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.respone && error.respone.data.message ? error.respone.data.message : error.message,
        })
    }
}