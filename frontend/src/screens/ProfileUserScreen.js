import React, { useEffect } from 'react'
import { Row, Col, Tabs, Tab, Toast, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails,  } from '../actions/userAction'
import { activeProducts, inActiveProducts } from '../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Product from '../components/Product'


const ProfileUserScreen = () => {

  const params = useParams()
  const pageNumber = params.pageNumber || 1


  const dispatch = useDispatch()
  const id = useParams()
  

  const productsActive = useSelector(state => state.productsActive)
  const { loading:loadingActive, error:errorActive, products:activeP, page, pages } = productsActive

  const productsInActive = useSelector(state => state.productsInActive)
  const { loading:loadingInActive, error:errorInActive, products:InActiveP, page:Inpage, pages:Inpages } = productsInActive

  const userDetails = useSelector(state => state.userDetails )
  const { loading, error, user} = userDetails

  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} = userLogin


  
  const history = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      history('/login')
    }
    else{
        dispatch(inActiveProducts('', pageNumber))
        dispatch(activeProducts('', pageNumber))
        if(!user?.name){
            dispatch(getUserDetails(id))
        }
    }
  }, [dispatch, history, userInfo, user , pageNumber])

  
  return (
   <Row>
       <Col md={3}>
      <h2>User Profile</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
  
      <ListGroup  variant='flush'>
          <ListGroup.Item><h4>User Name</h4><h3>{userInfo.name}</h3></ListGroup.Item>
          <ListGroup.Item><strong>{userInfo.email}</strong></ListGroup.Item>
          <ListGroup.Item>
                <h2>Bio</h2>: {userInfo.bio
              ? <strong>{userInfo.bio}</strong>
              : <strong>The seller has not provided a description for this item</strong>}
                    </ListGroup.Item>
      </ListGroup>
 </Col>
       <Col md={9}>
        <h2>User's Relevant Posts</h2>
           <Tabs id="profile-tab" className='mb-3' >
            <Tab eventKey="active" title="Active Bids">
              {loadingActive ? <Loader>loading..</Loader> : errorActive ? ( <Message variant='danger' >{errorActive}</Message> ) : (
             <>
             <Row>
                {activeP.map((product) => (
                  <React.Fragment key={product._id}>
                    <Col>
                      <Product product={product}/>
                    </Col> 
                </React.Fragment>
                ))}
              <Paginate pages={pages} page={page}/>
              </Row></>
              )}
            </Tab>
            <Tab eventKey="In-Active" title="In-Active Bids">
              {loadingInActive ? <Loader>loading..</Loader> : errorInActive ? ( <Message variant='danger' >{errorInActive}</Message> ) : (
             <>
             <Row>
              {InActiveP.map((product) => (
                  <React.Fragment key={product._id}>
                    <Col  sm={12} md={6} lg={5} xl={3}>
                      <Product product={product}/>
                    </Col>
                  </React.Fragment>
                 ))}
              <Paginate pages={Inpages} page={Inpage}/>
              </Row>
              </>
              )}
            </Tab>
            </Tabs>
        </Col>
   </Row>
  )
}
export default ProfileUserScreen