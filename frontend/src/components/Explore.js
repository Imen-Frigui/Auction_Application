import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Col, Image, Row } from 'react-bootstrap'
import Loader from './Loader'
import {listCategories, getProductsByFilter} from '../actions/categoryAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Message from './Message'

const Explore = () => {
    const [categoryIds, setCategoryIds] = useState([]);

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, categories, error } = categoryList
    
    useEffect(() => {
        dispatch(listCategories())
    },[dispatch])

    const handleCategory = e => {
		resetState()

		const currentCategoryChecked = e.target.value;
		const allCategoriesChecked = [...categoryIds];
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked)

		let updatedCategoryIds;
		if (indexFound === -1) {
			// add
			updatedCategoryIds = [...categoryIds, currentCategoryChecked]
			setCategoryIds(updatedCategoryIds)
		} else {
			// remove
			updatedCategoryIds = [...categoryIds]
			updatedCategoryIds.splice(indexFound, 1)
			setCategoryIds(updatedCategoryIds)
		}

		dispatch(
			getProductsByFilter({ type: 'category', query: updatedCategoryIds })
		)
	}

	const resetState = () => {
		setCategoryIds([])
	}
  
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
        <div className="py-3 px-5">
            <Row>
                {categories.map((category) =>{return(
                    <Col>
                        <div key={category._id}>
                            <Row>
                                <Image style={{width:'40px', height:'40px', marginLeft:'1px', opacity: '80%'}} src={category.icon}fluid />
                            </Row>
                            <Row><small style={{ color: 'black', fontWeight: 'bold', textAlign:'center' }}>{category.name}</small></Row>
                            <Row><input
										className='form-check-input'
										type='checkbox'
										name='category'
										value={category._id}
										id='flexCheckChecked'
										checked={categoryIds.includes(category._id)}
										onChange={handleCategory}
									/>
									<label
										className='form-check-label'
										htmlFor='flexCheckChecked'
									>
										{category.category}
									</label></Row>
                        </div>
                    </Col>
                )})}
            </Row>
        </div>
  )
}

export default Explore