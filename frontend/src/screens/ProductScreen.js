import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails} from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({history}) => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const productDetails = useSelector (state => state.productDetails)

    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
      }, [dispatch, id])

    const addHandler = () => {
        history.push(`/myposts/${id}`)
    }

    return (
    <>
        <Link className='btn btn-dark my-3' to='/'>more</Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : (
            <Row>
            <Col md={4} >
                <Image className='border border-primary' src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text ={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card> 
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <Row>
                            <Col>previous</Col>
                            <Col>70 DT</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Last Bid:
                            </Col>
                            <Col>
                                <strong>${product.bid} DT</strong>
                            </Col>
                        </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Finshing Date</Col>
                            <Col>{product.countDown>0 ? 'Runnig' : 'Ended'}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <Button onClick={addHandler}
                                className='btn-block' 
                                type='button' 
                                disabled={product.countDown === 0}>Bid</Button>
                            </Col>
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
        )}
        
    </> 
    )
}

export default ProductScreen