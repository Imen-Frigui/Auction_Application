import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_SUCCESS } from '../constants/productConstants'
import axios from 'axios'

const ProductCreateScreen = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [minIncrement, setMinIncrement] = useState(0)
    const [endDate , setEndDate] = useState('')
    const [condition, setCondition] = useState('')
    const [startPrice, setStartPrice] = useState(0)
    const [uploading, setUploading] = useState(false)



  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const history = useNavigate();


  const productCreate = useSelector (state => state.productCreate)
  const {loading, error, success} = productCreate


  useEffect(() => {
   if(success){
     if (userInfo.isAdmin===true){
    dispatch({type: PRODUCT_CREATE_SUCCESS})
    history('/admin/productlist')}
    else{history('/profile')}
            }
    }, [dispatch, history, success, userInfo])

  const submitHandler =(e) => {
    e.preventDefault()
    dispatch(createProduct({_id: id, name, minIncrement, description, category,image, endDate, setStartPrice}))
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
    {userInfo.isAdmin ?<Link to ='/admin/productlist' className='btn btn-light my-3'>Go Back</Link> :  (<Link to ='/profile' className='btn btn-light my-3'>Go Back</Link>)}
    <FormContainer>
      <h1>Create Product</h1>
      {error && <Message variant='danger'>{error}</Message>}
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

            <Form.Group controlId='startPrice'>
              <Form.Label>start Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='starting price'
                value={startPrice} onChange={(e) => setStartPrice(e.target.value)}
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

            <Button type='submit' variant='primary' className='mt-3'>
              CREATE
            </Button>
          </Form>
      )}
  
  </FormContainer>
    </>
    
  )
}

export default ProductCreateScreen