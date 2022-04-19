import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'

const ProfileScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassowrd] = useState('')
  const [message, setMessage] = useState(null)
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails )
  const { loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile )
  const {success} = userUpdateProfile
  
  const history = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      history('/login')
    }
    else{
        if(!user?.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(user?.name)
            setEmail(user?.email)
        }

    }
  }, [dispatch, history, userInfo, user])

  const submitHandler =(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password do not match')
    }else{
      dispatch(updateUserProfile({id: user._id, name, email, password }))
    }
  }
  return (
   <Row>
       <Col md={3}>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>ERROR: {message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader/>}
  
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name} onChange={(e) => setName (e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email} onChange={(e) => setEmail (e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password} onChange={(e) => setPassowrd(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword} onChange={(e) => setConfirmPassowrd(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
 </Col>
       <Col md={9}>
           <h2>My Posts</h2>
       </Col>
   </Row>
  )
}
export default ProfileScreen