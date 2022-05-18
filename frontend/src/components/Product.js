import React from 'react'
import {Link} from 'react-router-dom'//a ref not reload
import {Card, Button, Row, Col} from 'react-bootstrap'
import Countdown from '../components/Countdown'
//try accsess as prppes (prop) prop.product.__id
//Using destracter ({post})
const Product = ({ product }) => {
    const end = product.endDate.toString().replace('T23:00:00.000Z', ' ')

  return (
    <Card style={{width:'270px', height:'560px', marginBottom:'10px'}}>
    <Link to={`/post/${product._id}`}>
            <Card.Img src={product.image} width={130} height={250} variant='top' />
        </Link>
    <Card.Body>
    <Link to={`/post/${product._id}`}>
      <Card.Title style={{textAlign: "center"}} className="text-uppercase"><h5>{product.name}</h5></Card.Title>
    </Link>
      <Row>
        <Col>
          <Card.Header>
            <i style={{color:'green'}} className='fas fa-donate mr-3'/>
            <i style={{ color: 'red', fontWeight: 'bold' }} className='mr-3'>Last Price:</i>
            <i style={{ color: 'black', fontWeight: 'bold' }}>{product.currentPrice}</i>
          </Card.Header> 
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Card.Header>
            <i className='fas fa-hourglass-half mr-3' style={{color:'red'}}/>
            <i style={{ color: 'black', fontWeight: 'bold' }} ><Countdown endDate={product.endDate} /></i>
          </Card.Header>
        </Col>
      </Row>
    </Card.Body>
    <Link to={`/post/${product._id}`}>
        <Button style={{ width:'160px', color: 'white',backgroundColor: '#3235b2'}} className="rounded-pill ml-5 mb-1"> Participate </Button>
    </Link>
    <Card.Footer>
     Expiration Date:&nbsp;
     {product.active===true ? <small style={{ color: '#008542ff' }}>{end}</small> : <small style={{ color: 'red' }}>{end}</small> }
    </Card.Footer>
  </Card>
  
  )
}

export default Product
