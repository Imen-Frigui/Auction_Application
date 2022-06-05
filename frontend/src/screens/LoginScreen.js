import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    return (
        <FormContainer>
          <h1>Sign In</h1>
          <Form>
            <Form.Group >
              <Form.Label>Email Address</Form.Label>
            </Form.Group>
    
            <Form.Group>
              <Form.Label>Password</Form.Label>
            </Form.Group>
    
            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
    
          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              {/*<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
              </Link>*/}
            </Col>
          </Row>
        </FormContainer>
      )
    }
    
    export default LoginScreen