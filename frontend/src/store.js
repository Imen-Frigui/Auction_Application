import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productTopRatedReducer, makeBidReducer, userUpdateProductReducer, activeProductsReducer, inActiveProductsReducer, userPostsReducer} from './reducers/productsReducers'
import{userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer, profileReducer}from './reducers/userReducers'
import{ categoryCreateReducer, categoryDeleteReducer, categoryListReducer, categoryUpdateReducer, categoryDetailsReducer, getProductsByFilterReducer} from './reducers/categoryReducer'
import { listReviewsForUserreducer, userReviewCreateReducer, makeReviewHelpfulReducer } from './reducers/reviewReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    profileInfo: profileReducer,
    postsByUser: userPostsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    getProductsByFilter: getProductsByFilterReducer,
    productTopRated:productTopRatedReducer,
    bidMake:makeBidReducer,
    userUpdateProduct:userUpdateProductReducer,
    productsActive:activeProductsReducer,
    productsInActive:inActiveProductsReducer,
    reviewList: listReviewsForUserreducer,
    userReviewCreate: userReviewCreateReducer,
    makeHelpful: makeReviewHelpfulReducer,

})

const userInfoFromStorage =localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
    userLogin:  {userInfo: userInfoFromStorage}   
}

const middleware = [thunk]

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store
