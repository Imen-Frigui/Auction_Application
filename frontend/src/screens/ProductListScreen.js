import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
  const params = useParams()

    const pageNumber = params.pageNumber || 1
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()


    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList 

    const userLogin = useSelector(state => state.userLogin )
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete 
   
    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product: createdProduct } = productCreate 


    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
          history('/login')
        }
        //if(successCreate){
          //history(`/admin/product/${createdProduct._id}/edit`)
       // }else{
          dispatch(listProducts('',pageNumber))

       // }

    }, [history, userInfo, dispatch, successDelete, successCreate, createdProduct, pageNumber ])

    const deleteHandler = (id) =>{
      if(window.confirm('Are you sure ?')){
        dispatch(deleteProduct(id))
      }
    }
    const createProductHandler = () =>{
      history(`/admin/productlist/create_product`)
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                   <i className='fas fa-plus'></i>Create New Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message>{errorCreate}</Message>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message>{errorDelete}</Message>}
        {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>
        : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BID</th>
                        <th>CATEGPRY</th>
                        <th>state</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.currentPrice}</td>
                <td>{product.category?.name}</td>
                <td>
                  {product.active ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
        )}
    </>
  )
}

export default ProductListScreen