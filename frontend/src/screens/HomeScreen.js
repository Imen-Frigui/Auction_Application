import React, { useEffect } from 'react'
import{Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
//sm =small screen sm ls xl

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
        <>
        <h1>Latest Postes</h1>
        {loading ? <Loader>loading..</Loader> : error ? <Message variant='danger' >{error}</Message> : <Row>
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <Col sm={12} md={6} lg={5} xl={3}>
                    <Product product={product}/>
                </Col>
                </React.Fragment>
            ))}
        </Row> }
        
    </>
  )
}

export default HomeScreen