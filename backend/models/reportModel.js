import mongoose from "mongoose"

const reportSchema = mongoose.Schema({
    user:{
        type: String,
        required: true,
        ref: 'User'
    },
    report:[
        {
        name: {type:String,required:true},
        image: {type:String},
        description: {type:String,required:true},
        product: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Product'}

              }
            ],
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }

},{timestamps:true,})

const Report = mongoose.model ('Report', reportSchema)
export default Report