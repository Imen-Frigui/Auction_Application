import React from 'react'
import {Link} from 'react-router-dom'//a ref not reload
import { Row, Col, ListGroup, Container} from 'react-bootstrap'
import Rating from './Rating'
import Image from 'react-bootstrap/Image'
import Countdown from './Countdown'

const ReviewCard = ({ review }) => {
    const end = review.writtenAt.toString().replace('T23:00:00.000Z', ' ')
  return (
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}> 
                <ListGroup variant='fluid' className="order-last order-sm-first">
                    <ListGroup.Item>
                        <Row variant='fluid'className='mx-1'>
                            <Col className='col-md-3'><h4>{review.title}</h4></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row variant='fluid'className='mx-1'>
                            <Col className='col-md-3'><strong>Finshing Date</strong></Col>
                            <Col className='col-md-3'>{review.writtenAt.substring(0, 10)}</Col>

                      </Row>
                    </ListGroup.Item>
                        
                </ListGroup>
            </Container>
  )
}

export default ReviewCard