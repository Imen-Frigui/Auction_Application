import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import{ Navbar, Nav, Container} from 'react-bootstrap'


//change navbarclor by <Navbar class=".nav-bar" then edit it in index.css
//ml = marging left
//https://fontawesome.com/v4/icon/pencil-square-o

const Header = () => {
  return (
    <header>
        <Navbar className="bg-dark rounded-bottom" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to ='/'>
                <Navbar.Brand >Auction-app</Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <LinkContainer to ='/post'><Nav.Link>
                          <i className="fa fa-pencil-square"></i>MyPosts</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to ='/login'><Nav.Link>
                          <i className="fa fa-user"></i>Sign In</Nav.Link>
                        </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
export default Header