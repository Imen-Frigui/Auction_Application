import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import{Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from "./screens/LoginScreen"

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Container>
    <main className="py-3">
      <Routes>
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/post/:id' element={<ProductScreen/>} />
        <Route path='/myposts' />
        <Route exact path='/' element={<HomeScreen/>}/>

      </Routes>
      </main>
      </Container>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
