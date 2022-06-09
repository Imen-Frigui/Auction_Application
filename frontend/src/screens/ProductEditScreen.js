import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [endDate , setEndDate] = useState('')
  const [minIncrement, setMinIncrement] = useState(0)
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('')
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
    history('/admin/productlist')

   }else{
      if(!product?.name || product?._id !== id){
        dispatch(listProductDetails(id))
  
      }else{
        setName(product?.name)
        setMinIncrement(product?.minIncrement)
        setEndDate(product?.endDate)
        setImage(product?.image)
        setCategory(product?.category)
        setDescription(product?.description)

      }}
    }, [dispatch,product, id, history, successUpdate])

  const submitHandler =(e) => {
    e.preventDefault()
    dispatch(updateProduct({_id: id, name, minIncrement, description, category,image, endDate}))
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
    <Link to ='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
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
    
            <Form.Group controlId='condition'>
              <Form.Label>condition</Form.Label>
              <Form.Control
                type='text'
                placeholder='Eitheir uesed or new'
                value={condition} onChange={(e) => setCondition(e.target.value)}
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
            
            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={category} onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='endDate'>
              <Form.Label>endDate</Form.Label>
              <Form.Control
                type='Date'
                value={endDate} onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='minIncrement'>
              <Form.Label>minIncrement</Form.Label>
              <Form.Control
                type='number'
                placeholder='minIncrement'
                value={minIncrement} onChange={(e) => setMinIncrement(e.target.value)}
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
    
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
      )}
  
  </FormContainer>

    </>
    
  )
}

export default ProductEditScreen