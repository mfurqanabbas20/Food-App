const express = require('express')
const {addFood, listFood, removeFood} = require('../controllers/foodController')

const multer = require('multer')

const foodRouter = express.Router();

// Image Storage Engine
// Using Multer disk storage



const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({
    storage: storage
})

foodRouter.post('/add',upload.single("image"), addFood)
foodRouter.get('/list', listFood)
foodRouter.delete('/remove', removeFood)

module.exports = foodRouter;