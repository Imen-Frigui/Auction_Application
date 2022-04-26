import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer, makeBidReducer, userUpdateProductReducer, activeProductsReducer, inActiveProductsReducer} from './reducers/productsReducers'
import{userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer}from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    bidMake:makeBidReducer,
    userUpdateProduct:userUpdateProductReducer,
    productsActive:activeProductsReducer,
    productsInActive:inActiveProductsReducer

})

const userInfoFromStorage =localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin:  {userInfo: userInfoFromStorage}   
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store
