import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    icon:{
        type: String,
    },
    description:{
        type: String,
    }

},{timestamps:true,})

const Category = mongoose.model ('Category', categorySchema)
export default Category