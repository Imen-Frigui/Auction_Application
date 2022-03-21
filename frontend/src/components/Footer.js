import React from 'react'
import{Container, Row, Col} from 'react-bootstrap'

//py = padding in y axes=3
const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; ICONE
                    </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer