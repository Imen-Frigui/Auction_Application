import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import{ Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction'
import SearchBox from '../components/SearchBox'
import { useNavigate } from 'react-router-dom'

//change navbarclor by <Navbar class=".nav-bar" then edit it in index.css
//ml = marging left
//https://fontawesome.com/v4/icon/pencil-square-o


const Header = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar className="bg-dark rounded-bottom" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to ='/'>
                <Navbar.Brand >Auction-app</Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox ></SearchBox>
                        {/*<Route render={({history}) =>{ <SearchBox history={history}/>}} /> */}
                            
                        <Nav className="ml-auto">
                        <LinkContainer to ='/post'><Nav.Link>
                          <i className="fa fa-pencil-square"></i>MyPosts</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : (<LinkContainer to ='/login'><Nav.Link>
                        <i className="fa fa-user"></i>Sign In</Nav.Link>
                      </LinkContainer>)}
                      {userInfo && userInfo.isAdmin && (
                          <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/categorylist'>
                              <NavDropdown.Item>Category</NavDropdown.Item>
                            </LinkContainer>
                          </NavDropdown>
                        ) }
                        
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
export default Header