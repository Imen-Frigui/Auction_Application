import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productsReducers'
import{userLoginReducer}from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer
})

const userInfoFromStorage =localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin:  {userInfo: userInfoFromStorage}   
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store
