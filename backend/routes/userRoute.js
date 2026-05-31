const express = require('express')

const {loginUser, registerUser, getAllUsers} = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/register',registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/getUsers', getAllUsers)

module.exports = userRouter;
