const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // manage the user cart
    cartData: {
        type: Object,
        default: {}
    }
},{
    // if we don't add minimize: false then cartData will not be created
    minimize: false
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = userModel