import React from 'react'
import {Link} from 'react-router-dom'//a ref not reload
import { Row, Col, ListGroup, Container} from 'react-bootstrap'
import Rating from './Rating'
import Image from 'react-bootstrap/Image'
import Countdown from './Countdown'

const ProductCard = ({ product }) => {
  return (
      <>
        <Row variant='fluid'className='mx-1'>
        <Col className='col-md-3'>
            <Link to={`/post/${product._id}`}>
            <Image src={product.image}  width={210} height={180} className='border border-info mt-2 rounded'/>
          </Link></Col>
          <Col md={8}>
            <Container> 
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col><h4>{product.name}</h4></Col>
                            <Col className='col-md-2'><strong> Current Price:</strong></Col>
                            <Col className='col-md-2'>{product.currentPrice}DT</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                            <Col><strong>Finshing Date</strong></Col>
                            <Col>{product.endDate}</Col>
                            <Col><strong>Time Left:</strong></Col>
                            <Col><Countdown endDate={product.endDate} /></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            {product.active &&(<Col className='col-md-2 text-success'><strong>ACTIVE</strong></Col>)}
                            {!product.active &&(<Col className='col-md-3 text-danger'><strong>IN-ACTIVE</strong></Col>)}
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description</strong>: {product.description
              ? <p>{product.description}</p>
              : <h4>The seller has not provided a description for this item</h4>}
                    </ListGroup.Item>
                        
                </ListGroup>
            </Container>
            </Col>       
        </Row>
     </>
  )
}

export default ProductCard