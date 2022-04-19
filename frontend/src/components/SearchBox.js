import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button}from 'react-bootstrap'

const SearchBox = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        history(`/search/${keyword}`)
      } else {
        history('/')
      }
    }
  
    return (
      <Form  className='d-flex' onSubmit={submitHandler} style={{width:'70%'}}>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-4 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    )
  }

export default SearchBox