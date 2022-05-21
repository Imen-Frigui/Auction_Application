import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Tabs, Tab, Toast,ListGroup, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { profile  } from '../actions/userAction'
import { userPosts } from '../actions/productAction'
import {listReviewsForUser} from '../actions/reviewAction' 
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'


const UserProfileScreen = () => {


  const {id} = useParams()


  const dispatch = useDispatch()
  

  const profileInfo = useSelector(state => state.profileInfo)
  const { loading, error, user } = profileInfo

  const postsByUser = useSelector(state => state.postsByUser)
  const {  loading:loadingP, error:errorP, products } = postsByUser

  const reviewList = useSelector(state => state.reviewList)
  const {  loading:loadingR, error:errorR, reviews } = reviewList
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  
  useEffect(() => {

    dispatch(profile(id))
    dispatch(userPosts(id))
    dispatch(listReviewsForUser(id))

    }
  , [dispatch, id])

  const submitHandler =(e) => {
//
  }
     

  return (
<Row>
       <Col md={3}>
      <h2>User Profile</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
  
      <ListGroup  variant='flush'>
          <ListGroup.Item><h4>User Name</h4><h3>{user.name}</h3></ListGroup.Item>
          <ListGroup.Item><strong>{user.email}</strong></ListGroup.Item>
          <ListGroup.Item>
                <h2>Bio</h2>: {user.bio
              ? <strong>{user.bio}</strong>
              : <strong>The seller has not provided a description for this item</strong>}
                    </ListGroup.Item>
      </ListGroup>
 </Col>
       <Col md={9}>
        <h2>User's Relevant Posts</h2>
            <>
                <Tabs id="profile-tab" className='mb-3' >
                    <Tab eventKey="active" title="posts">
                        {loadingP ? <Loader>loading..</Loader> : errorP ? ( <Message variant='danger' >{errorP}</Message> ) : (
                            <>
                                {products.map((product) => (
                                    <Row className='border border-dark mb-2'>
                                        <React.Fragment key={product._id}>
                                            <Col>
                                                <ProductCard product={product}/>
                                            </Col> 
                                        </React.Fragment>   
                                    </Row>                         
                                ))}
                            </>                        
                        )}        
                    </Tab>
                    <Tab eventKey="reviews" title="reviews">
                    {loadingR ? <Loader>loading..</Loader> : errorR ? ( <Message variant='danger' >{errorR}</Message> ) : (
                        <Row>
                            <Col>
                        {reviews.map((review) => (
                            <Row>
                                <Col>
                                <React.Fragment key={review._id}>
                                    <ListGroup variant='fluid' className="mb-2">
                                        <ListGroup.Item>
                                            <h4 style={{ fontSize: 27 }}>{review.title}</h4>
                                            <Rating>{review.rating}</Rating>
                                            <p className='small-text'>
                                                By{' '}
                                                    <Link to={`/profile/${review.writtenBy}`}>
                                                        {review.writtenBy.name} on {review.writtenAt.substring(0, 10)}
                                                    </Link>
                                            </p>
                                            <strong style={{ fontSize: 20 }}>{review.text}</strong>
                                            
                                        </ListGroup.Item> 
                                    </ListGroup>
                                </React.Fragment>  
                                </Col>
                            </Row>                    
 
                        ))}
                        </Col>
                        <Col><Col>
                                <h2>Write a Customer Review</h2>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                                </Col></Col>
                        </Row>
                    )}        
                    </Tab>
                </Tabs>            
            </>
      </Col>
              
</Row>
  )
}
export default UserProfileScreen