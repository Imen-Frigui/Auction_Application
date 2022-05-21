import AsyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

//get all categories ___ GET /api/category PUBLIC
const getCategories = AsyncHandler(async(req, res) => {
const categories = await Category.find({})
//throw new Error('Error')
  res.json({categories})
})

//get SINGLE category ___ GET /api/product:/ID PUBLIC
const getCategoryById = AsyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id)
    if(category){
        res.json(category)
    }else{
        throw new Error('Category not found')
    }
})

//post SINGLE category ___ GET /api/catgeory:/ID PRIVATE/ADMIN
const createCategory = AsyncHandler(async(req, res) => {
    const category = new Category({
        name: 'Sample',
        icon: '',
        description: 'No discription',
    })
    const createdCategory = await category.save()
    res.status(201).json(createdCategory)

})
//delete SINGLE category ___ DELETE /api/category:/ID PRIVATE/ADMIN
const deleteCategory = AsyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.id)
    if(category){
        await category.remove()
        res.json({message: 'Category Removed'})
    }else{
        throw new Error('Catgeory Not Found')
    }
})

//update SINGLE category ___ PUT /api/category/:id PRIVATE/ADMIN
const updateCategory = AsyncHandler(async(req, res) => {
    const {name, icon,description} = req.body

    const category = await Category.findById(req.params.id)

    if(category){
        category.name = name
        category.icon = icon
        category.description = description

        const updatedCategory = await category.save()
        res.json(updatedCategory)
    }else{
        res.status(404)
        throw new Error ('')
    }
   
})  

export {getCategories, createCategory, deleteCategory, updateCategory, getCategoryById}