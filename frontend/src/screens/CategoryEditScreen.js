import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../actions/categoryAction'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

import axios from 'axios'

const CategoryEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const history = useNavigate();


  const categoryDetails = useSelector(state => state.categoryDetails )
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector(state => state.categoryUpdate )
  const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = categoryUpdate


  useEffect(() => {
   if(successUpdate){
    dispatch({type: CATEGORY_UPDATE_RESET})
    history('/admin/categorylist')

   }else{
      if(!category?.name || category?._id !== id){
        dispatch(listCategoryDetails(id))
  
      }else{
        setName(category?.name)
        setIcon(category?.icon)
        setDescription(category?.description)

      }}
    }, [dispatch,category, id, history, successUpdate])

  const submitHandler =(e) => {
    e.preventDefault()
    dispatch(updateCategory({_id: id, name, icon, description}))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('icon', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setIcon(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
    <Link to ='/admin/categorylist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Update Category</h1>
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
    
            <Form.Group controlId='icon'>
            <Form.Label>Icon</Form.Label>
              <Form.Control
                placeholder='Icon URL'
                value={icon} onChange={(e) => setIcon(e.target.value)}
              ></Form.Control>
             <Form.Control type='file' label='Choose File' onChange={uploadFileHandler}></Form.Control>
              {uploading && <Loader/>}
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

export default CategoryEditScreen