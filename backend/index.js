import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'
import morgan from 'morgan'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import {notFound, errorHandler} from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express ()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api is running...')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use (notFound)
app.use (errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running on port ${PORT}`))
