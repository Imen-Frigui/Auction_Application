import React, { useEffect } from 'react'
import{Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Explore from '../components/Explore'


//sm =small screen sm ls xl

const HomeScreen = () => {
  const params = useParams()

  const keyword = params.keyword

  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()
  
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
  <>
  <Meta />
  {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-dark'>go back</Link>}
    <Explore className='explore'/>
        <h1>Latest Postes</h1>
        {loading ? <Loader>loading..</Loader> : error ? ( <Message variant='danger' >{error}</Message> ) : 
        ( 
          <>
          <Row>
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <Col sm={12} md={6} lg={5} xl={3}>
                    <Product product={product}/>
                </Col>
                </React.Fragment>
            ))}
        </Row> 
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>)}
        
    </>
  )
}

export default HomeScreen