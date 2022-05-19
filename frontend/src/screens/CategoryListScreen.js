import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { listCategories, deleteCategory, createCategory } from '../actions/categoryAction'

const CategoryListScreen = () => {
  const params = useParams()

    const pageNumber = params.pageNumber || 1
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()


    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories, pages, page } = categoryList 

    const userLogin = useSelector(state => state.userLogin )
    const {userInfo} = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = categoryDelete 
   
    const categoryCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, category: createdCategory } = categoryCreate 


    useEffect(() => {
        dispatch({type:CATEGORY_CREATE_RESET})

        if(!userInfo.isAdmin){
          history('/login')
        }
        if(successCreate){
          history(`/admin/category/${createdCategory._id}/edit`)
        }else{
          dispatch(listCategories('',pageNumber))

        }

    }, [history, userInfo, dispatch, successDelete, successCreate, createdCategory, pageNumber ])

    const deleteHandler = (id) =>{
      if(window.confirm('Are you sure ?')){
        dispatch(deleteCategory(id))
      }
    }
    const createCategoryHandler = () =>{
       dispatch(createCategory())
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>categories</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createCategoryHandler}>
                   <i className='fas fa-plus'></i>Create New Category
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {errorCreate && <Message>{errorCreate}</Message>}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message>{errorDelete}</Message>}
        {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>
        : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ICON</th>
                        <th>DESCRIPTION</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td><Image style={{width:'40px', height:'40px'}} src={category.icon}fluid /></td>
                <td>{category.description}</td>
                <td>
                  <LinkContainer to={`/admin/category/${category._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(category._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
        )}
    </>
  )
}

export default CategoryListScreen