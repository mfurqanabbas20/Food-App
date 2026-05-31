const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
// jwt => to create authentication
const bcrypt = require('bcrypt')
const validator = require('validator')


// login user

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.json({success: false, message: 'Invalid Credentials'})
            }
            const token = createToken(user._id)
           return res.status(200).json({success: true, token})
        }
        else {
            res.status(401).json({success: false, message: 'User Not Existed'})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error Occured'})
        
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}




// register user

const registerUser = async (req, res) =>{
    const {name, email, password} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(409).json({success: 'false', message: 'User Exists'})
        }
        // Validating emai
        if(!validator.isEmail(email)){
            return res.json({success: 'false', message: 'Enter Valid Email'})
        }
        if(password.length < 8){
            return res.json({success: 'false', message: 'Enter Strong Password'})
        }
        // Encrypt the password
        // select no between 5 to 15 => stronger password it also takes time
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const user = await userModel.create(newUser)
        const token = createToken(user._id)
        res.json({success: true, token})
    }
    catch(err){
        console.log(err);
        res.json({success: false, message: 'Error Occured'})
    }
}

const getAllUsers = async(req, res) => {
    try {
    const users = await userModel.find({})
    res.status(200).json({success: true, data: users})
        
    } catch (error) {
        console.log(error);
    res.status(200).json({success: false, message: 'error occured'})
        
    }
}


module.exports = {loginUser, registerUser, getAllUsers}