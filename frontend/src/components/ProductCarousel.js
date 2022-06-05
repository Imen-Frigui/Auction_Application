import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import {listTopProducts} from '../actions/productAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Message from './Message'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, products, error } = productTopRated
    
    useEffect(() => {
        dispatch(listTopProducts())
    },[dispatch])
  
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}({product.bid})DT</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
  )
}

export default ProductCarousel