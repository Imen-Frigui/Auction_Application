import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import{Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import UserEditProduct from './screens/UserEditProduct'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import Chat from './screens/Chat'

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Container>
    <main className="py-3">
      <Routes>
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/profile' element={<ProfileScreen/>} />
        <Route path='/profile/:id' element={<UserProfileScreen/>} />
        <Route exact path='/create_product' element={<ProductCreateScreen/>} />
        <Route path='/post/:id' element={<ProductScreen/>} />
        <Route path='/chat' element={<Chat/>}/>
        
        <Route path='/admin/userlist' element={<UserListScreen/>} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
        <Route path='/user/:id/edit' element={<UserEditScreen/>} />
        
        <Route exact path='/admin/productlist' element={<ProductListScreen/>} />
        <Route exact path='/admin/productlist/create_product' element={<ProductCreateScreen/>} />
        <Route exact path='/admin/productlist/:pageNumber' element={<ProductListScreen/>} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
        
        <Route exact path='/admin/categorylist' element={<CategoryListScreen/>} />
        <Route exact path='/admin/categorylist/:pageNumber' element={<CategoryListScreen/>} />
        <Route path='/admin/category/:id/edit' element={<CategoryEditScreen/>} />

        <Route path='/product/:id/edit' element={<UserEditProduct/>} />
        
        <Route exact path='/search/:keyword' element={<HomeScreen/>}/>
        <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
        <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
        <Route exact path='/' element={<HomeScreen/>}/>
      </Routes>
      </main>
      </Container>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
