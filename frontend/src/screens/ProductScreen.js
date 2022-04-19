import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview, listProducts} from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Meta from '../components/Meta'
import Countdown from '../components/Countdown'
import Product from '../components/Product'


const ProductScreen = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useNavigate();

    const[rating, setRating]= useState(0)
    const[comment, setComment]= useState('')


    const productDetails = useSelector (state => state.productDetails)
    const {loading, error, product} = productDetails

    const makeBid = useSelector(state => state.makeBid)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
      success: successProductReview,
      loading: loadingProductReview,
      error: errorProductReview,
    } = productReviewCreate

    const productList = useSelector(state => state.productList)
    const { products, page, pages  } = productList

    useEffect(() => {
        dispatch(listProductDetails(id))
        dispatch(listProducts())

      }, [dispatch, id])

    /*const addHandler = () => {
        history(`/myposts/${id}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(id, {
            rating,
            comment,
          })
        )
      }*/
      const [uploading, setUploading] = useState(false);

      const [formData, setFormData] = useState({
        bid: ''
      });
    
      const { bid } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async e => {
        e.preventDefault();
        setUploading(true);
        if (bid * 100 > product.currentPrice + product.minIncrement) {
          await makeBid(bid, product._id);
        } else {
          console.log("Bid isn't big enough");
        }
        setUploading(false);
        setFormData({ bid: '' });
      };
  

    return (
    <>

        <Link className='btn btn-dark my-3' to='/'>more</Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : (
            <>
            <Meta title={product.name} />
            <Row>
            <Col md={4} >
                <Link className='link' to={`/profile/`}>
                       <h5>Listing created by</h5> <h6>{/*product.user.name*/}</h6>
                </Link>
                <Image className='border border-primary' src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text ={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: <h3>{product.description}</h3> {product.description
              ? product.description
              : 'The seller has not provided a description for this item'}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card> 
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col>startPrice:</Col>
                            <Col>{product.startPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                              Current Price:
                            </Col>
                            <Col>
                              <strong>{product.currentPrice} DT</strong>
                            </Col>
                        </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Finshing Date</Col>
                            <Col>Time Left: <Countdown endDate={product.endDate} /></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>State of activness</Col>
                            <Col>{!product.active ? <>Biding ended</> : <>Biding active</>}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            <Form md={4} className=''  onSubmit={e => onSubmit(e)}>
                              <Form.Group  controlId='bid-form-group'>
                                <Form.Control
                                  type='number'
                                  placeholder={`Enter bid higher than ${product.currentPrice + product.minIncrement}`}
                                  name='bid'
                                  value={bid}
                                  step='0.01'
                                  onChange={e => onChange(e)}
                                  disabled={!product.active}
                                  required
                                />
                              
                                <Button 
                                  type='submit'
                                  className='btn btn-primary'
                                  value={uploading ? 'Placing..' : 'Place bid'}
                                  disabled={!product.active}
                                >BID</Button>
                              </Form.Group>
                            </Form>
                            </Col>
                        </Row>
                      </ListGroup.Item>
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
        {/*userInfo.isAuthenticated && userInfo._id !== product.user._id && (<h1>report</h1>)*/}
      
            {/* userInfo._id === product.user._id && (
              <Link //to={`/product/${product.id}/edit`}
              >
                <h4>EDIT</h4>
              </Link>
            )*/}
          
        
          <h2 className='large-heading'>More Items to consider</h2>
          <Row>
          {products.map(product => (
            <React.Fragment key={product._id}>
                <Col  sm={12} md={6} lg={5} xl={3}>
                <Product product={product}/>
                </Col>
            </React.Fragment>
          ))}
        </Row>
    </> 
    )
}

export default ProductScreen