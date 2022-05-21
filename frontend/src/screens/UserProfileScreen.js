import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Tabs, Tab, Toast,ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { profile  } from '../actions/userAction'
import { userPosts } from '../actions/productAction'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const UserProfileScreen = () => {


  const {id} = useParams()


  const dispatch = useDispatch()
  

  const profileInfo = useSelector(state => state.profileInfo)
  const { loading, error, user } = profileInfo

  const postsByUser = useSelector(state => state.postsByUser)
  const {  loading:loadingP, error:errorP, products } = postsByUser


  
  useEffect(() => {

    dispatch(profile(id))
    dispatch(userPosts(id))

    }
  , [dispatch, id])


     

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
             <Row>
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
                </Tabs>            
             </Row>
            </>
      </Col>
              
</Row>
  )
}
export default UserProfileScreen