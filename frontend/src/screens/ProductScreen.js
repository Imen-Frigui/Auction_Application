import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, listProducts, makeBid} from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Countdown from '../components/Countdown'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { PRODUCT_ADD_BID_RESET } from '../constants/productConstants'
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share'


const ProductScreen = () => {

 
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useNavigate()

    const shareUrl = `http://localhost:3000/post/${id}`


    const [message, setMessage] = useState(null)
    const [messageBid, setMessageBid] = useState(null)
    const [bid, setBid] = useState('')

    const pageNumber = useParams().pageNumber || 1


    const productDetails = useSelector (state => state.productDetails)
    const {loading, error, product} = productDetails

    const bidMake = useSelector(state => state.bidMake)
    const { loading:loadingBid, error:errorBid, success: successBid } = bidMake

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const productList = useSelector(state => state.productList)
    const { products, pages, page } = productList


    useEffect(() => {
        dispatch(listProductDetails(id))
        dispatch(listProducts('', pageNumber))
        if(successBid){
          dispatch({type: PRODUCT_ADD_BID_RESET})
          setMessageBid('Bid made')
        }
      }, [dispatch, id, successBid, pageNumber,errorBid, Countdown])
        

      const submitHandler =(e) => {
        if(!userInfo) {
          history('/login')
        }else{
          e.preventDefault()
          if (bid  > product.currentPrice + product.minIncrement) {
            dispatch(makeBid({bid, _id: product._id}))
          }else{
            setMessage("Bid isn't big enough")
        }
      }
      }
        
          
    return (
    <>
        <Link className='btn btn-dark my-3' to='/'>more</Link>
        {errorBid && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {messageBid && <Message variant='success'>{messageBid}</Message>}
        {successBid && <Message variant='success'>Bid aded</Message>}
        {loadingBid && <Loader/>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : (        
        
            <>
            <Meta title={product.name} />
            <Row>
            <Col md={4} >
              <Row><Link className='link' to={`/profile/${product.user?._id}`}>
                  <h6>Auction created by</h6><i>{product.user?.name}</i>
                </Link></Row>
                <Row><Image className='border border-primary' src={product.image} alt={product.name} fluid /></Row>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description</strong>: {product.description
              ? <h4>{product.description}</h4>
              : <h4>The seller has not provided a description for this item</h4>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <strong className='mr-2'>share this post</strong>
                <FacebookShareButton className='ml-1 mr-1'
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card> 
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col><strong>Created At</strong></Col>
                            <Col>{product.createdAt}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col><strong>Condition</strong></Col>
                            <Col>{product.condition}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col><strong>Starting Price:</strong></Col>
                            <Col>{product.startPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col><strong> Current Price:</strong></Col>
                            <Col>{`${product.currentPrice} `}DT</Col>
                        </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                         <Col><strong>Finshing Date</strong></Col>
                          <Col>{product.endDate}</Col>
                      </Row>
                    </ListGroup.Item>
                    {product.active ?(<ListGroup.Item>
                        <Row>
                          <Col><strong>Time Left:</strong></Col>
                          <Col><Countdown endDate={product.endDate} /></Col>
                        </Row>
                    </ListGroup.Item>):(<></>)}
                    <ListGroup.Item>
                        <Row>
                            <Col><strong>State of activness</strong></Col>
                            <Col>{!product.active ? <h6 className='text-danger'>Biding ended</h6> : <h6 className='text-success'>active</h6>}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            {product.winner ?(!product.active && (<Link to={`/profile/${product.winner}`}><h1>go to winner profile :</h1><h2>{product.winner?.name}</h2></Link>))
                            :(<Form md={4} className=''  onSubmit={submitHandler}>
                              <Form.Group  controlId='bid-form-group'>
                                {`to participate in the auction you must add ${product.minIncrement} to the Current Price `}
                                <Form.Control
                                  className='btn-block'
                                  type='number'
                                  placeholder={`Enter bid higher than ${product.currentPrice + product.minIncrement}`}
                                  name='bid'
                                  step='10'
                                  value={bid} onChange={(e) => setBid(e.target.value)}
                                  disabled={!product.active}
                                />
                                <Button 
                                  type='submit'
                                  className='btn-block'
                                  disabled={!product.active}
                                >BID</Button>
                              </Form.Group>
                            </Form>)}
                            </Col>
                        </Row>
                      </ListGroup.Item>
                      {userInfo ? (userInfo._id === product.user &&(<ListGroup.Item>
                        <Row>
                          <Col><Link className='btn btn-block bg-info' to={`/product/${product._id}/edit`}>EDIT</Link></Col>
                        </Row>
                      </ListGroup.Item>)): (<></>)}
                    {userInfo && (userInfo._id !== product.user &&(
                      <ListGroup.Item>     
                        <Row>
                          <Col>
                            <Button
                              //onClick={sendReportHandler}
                              className='btn-block btn-danger'
                              type='button' >Report</Button>
                          </Col>
                        </Row>
                      </ListGroup.Item> 
                      ))}
                    </ListGroup>
            </Card>
            </Col>
        </Row>

      {/* <Row>
            <Col md={6}>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
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
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
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
                </ListGroup.Item>
              </ListGroup>
            </Col>
                  </Row>*/}
                 
        </>
        )}

          

          <h2 className='large-heading'>More Items to consider</h2>
          <>
          <Row>
          {products.map(product => (
            <React.Fragment key={product._id}>
                <Col  sm={12} md={6} lg={5} xl={3}>
                <Product product={product}/>
                </Col>
            </React.Fragment>
          ))}
        </Row>
        <Paginate pages={pages} page={page}/></>
    </> 
    )
}

export default ProductScreen