import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Tabs, Tab, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { activeProducts, inActiveProducts, deleteProduct, createProduct } from '../actions/productAction'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCard from '../components/ProductCard'


const ProfileScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassowrd] = useState('')
  const [message, setMessage] = useState(null)
  const [name, setName] = useState('')

  const params = useParams()
  const pageNumber = params.pageNumber || 1


  const dispatch = useDispatch()
  

  const productsActive = useSelector(state => state.productsActive)
  const { loading:loadingActive, error:errorActive, products:activeP, page, pages } = productsActive

  const productsInActive = useSelector(state => state.productsInActive)
  const { loading:loadingInActive, error:errorInActive, products:InActiveP, page:Inpage, pages:Inpages } = productsInActive

  const userDetails = useSelector(state => state.userDetails )
  const { loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile )
  const {success} = userUpdateProfile

  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete 

  const productCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product: createdProduct } = productCreate 

  
  const history = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      history('/login')
    }
    else{
        dispatch(inActiveProducts('', pageNumber))
        dispatch(activeProducts('', pageNumber))
        if(!user?.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(user?.name)
            setEmail(user?.email)
        }

    }
  }, [dispatch, history, userInfo, user,successDelete, successCreate, createdProduct, pageNumber])

  const submitHandler =(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password do not match')
    }else{
      dispatch(updateUserProfile({id: user._id, name, email, password }))
    }
  }   
  const endHandler = (id) =>{
    if(window.confirm('Are you sure ?')){
      //dispatch(deleteUser(id))
    }
  }
  const deleteHandler = (id) =>{
    if(window.confirm('Are you sure ?')){
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () =>{
   dispatch(createProduct())
 }

  return (
    
   <Row>
       <Col md={3}>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>ERROR: {message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message>{errorCreate}</Message>}
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
        <h2>My Relevant Posts</h2>
        <Row>
          <Col>  
          {loadingDelete && <Loader/>}
          {errorDelete && <Message>{errorDelete}</Message>}
          {successDelete && <Toast>
        <Toast.Header>
          <strong className="mr-auto">
              Auction-App
          </strong>
          <small>
             Just Now
          </small>
        </Toast.Header>
        <Toast.Body>
            <h6>You have just delted a post</h6> 
        </Toast.Body>
      </Toast>}</Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i>Create New Post
            </Button>
          </Col>
        </Row>
           <Tabs id="profile-tab" className='mb-3' >
            <Tab eventKey="active" title="Active Bids">
              {loadingActive ? <Loader>loading..</Loader> : errorActive ? ( <Message variant='danger' >{errorActive}</Message> ) : (
             <>
                {activeP.map((product) => (
                  <Row className='border border-dark mb-2'>
                  <React.Fragment key={product._id}>
                    <Button variant='danger'className='btn-sm' onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'> delete</i>
                    </Button>
                    <ProductCard product={product}/>
                    <Link className='btn btn-block bg-info ' to={`/product/${product._id}/edit`}>EDIT</Link>                 
                    <Button className='btn btn-block bg-warning mt-1' onClick={() => endHandler(product._id)}>END BID</Button>                         
                </React.Fragment>
                </Row>))}
              <Paginate pages={pages} page={page}/></>
              )}
            </Tab>
            <Tab eventKey="In-Active" title="In-Active Bids">
              {loadingInActive ? <Loader>loading..</Loader> : errorInActive ? ( <Message variant='danger' >{errorInActive}</Message> ) : (
             <>
              {InActiveP.map((product) => (
                <Row className='border border-dark mb-2'>
                  <React.Fragment key={product._id}>
                    <Button variant='danger'className='btn-sm' onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'> delete</i>
                    </Button>
                    <ProductCard product={product}/>
                    <Link className='btn btn-block bg-info' to={`/product/${product._id}/edit`}>EDIT</Link>                 
                    <Button className='btn btn-block bg-warning mt-1' onClick={() => endHandler(product._id)}>View Winner</Button>                         
                    
                  </React.Fragment>
                </Row>  ))}
              <Paginate pages={Inpages} page={Inpage}/></>
              )}
            </Tab>
            </Tabs>
        </Col>
   </Row>
  )
}
export default ProfileScreen