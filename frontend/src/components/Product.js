import React from 'react'
import {Link} from 'react-router-dom'//a ref not reload
import {Card} from 'react-bootstrap'
import Rating from './Rating'
//try accsess as prppes (prop) prop.product.__id
//Using destracter ({post})
const Product = ({ product }) => {
  return (
      <Card className='my-3 p-2 rounded'>
          <Link to={`/post/${product._id}`}>
              <Card.Img src={product.image} variant='top' />
          </Link>
          <Card.Body>
            <Link to={`/post/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
               {/* <div className='my-3'>
                    {product.rating} from {product.numReviews} reviews
                </div>*/}
                <Rating 
                value={product.rating} 
                text={`${product.numReviews} reviews`}
                color='#f8e825'/>
            </Card.Text>

            <Card.Text as='h3'>
                {product.bid} DT
            </Card.Text>
          </Card.Body>
      </Card>
  )
}

export default Product