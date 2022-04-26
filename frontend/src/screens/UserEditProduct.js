import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, userUpdateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const UserEditProduct = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countDown, setCountDown] = useState(0)
  const [description, setDescription] = useState(0)
  const [bid, setBid] = useState('')
  const [uploading, setUploading] = useState(false)



  const dispatch = useDispatch()
  const history = useNavigate();


  const productDetails = useSelector(state => state.productDetails )
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate )
  const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = productUpdate


  useEffect(() => {
   if(successUpdate){
    dispatch({type: PRODUCT_UPDATE_RESET})
   }else{
      if(!product?.name || product?._id !== id){
        dispatch(listProductDetails(id))
  
      }else{
        setName(product?.name)
        setBrand(product?.brand)
        setBid(product?.bid)
        setImage(product?.image)
        setCountDown(product?.countDown)
        setCategory(product?.category)
        setDescription(product?.description)

      }}
    }, [dispatch,product, id, history, successUpdate])

  const submitHandler =(e) => {
    e.preventDefault()
    dispatch(userUpdateProduct({_id: id, name,bid, brand, description, category,image, countDown}))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
    <FormContainer>
      <h1>Update Product</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :(
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name} onChange={(e) => setName (e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='bid'>
              <Form.Label>Bid</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter biding amount'
                value={bid} onChange={(e) => setBid(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
              <Form.Control
                placeholder='Image URL'
                value={image} onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
             <Form.Control type='file' label='Choose File' onChange={uploadFileHandler}></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>
            
            <Form.Group controlId='brand'>
              <Form.Label>brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand} onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter biding amount'
                value={category} onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='descritpion'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='text'
                placeholder='describe product'
                value={description} onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countDownn'>
              <Form.Label>countDown</Form.Label>
              <Form.Control
                type='Date'
                placeholder='describe product'
                value={countDown} onChange={(e) => setCountDown(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
      )}
  
  </FormContainer>

    </>
    
  )
}

export default UserEditProduct