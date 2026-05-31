// jwt for authenticatoin
// bcrypt for encrpting user data
// cors giving permission to frontend to connect with backend
// dotenv for using enviornment variable in our project
// body parser for parse the data that is coming from user
// multer for image store system
// stripe for payment gateways 
// validator for checking is password or id is valid or not 
// config for configuration files like db config files etc.
// models for model of our mongodb 
// controllers is for adding login for our backend
// .env for storing all the enviornment variables
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')
const foodRouter = require('./routes/foodRoute.js')
const userRouter = require('./routes/userRoute.js')
const cartRouter = require('./routes/cartRoute.js')
const orderRouter = require('./routes/orderRoute.js')
// app config
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())



// api endpoints
app.use('/api/food',foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/users',userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRouter)

// Db Connection

connectDB()


app.get('/', (req, res) => {
    res.send("API Working")
})

// run express server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})