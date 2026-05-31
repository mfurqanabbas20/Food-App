const foodModel = require('../models/foodModel')

const fs = require('fs')
// pre build in nodejs

// add food item

const addFood = async (req, res) => {
    try{
    let image_filename = `${req.file.filename}`;

    const food = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    }
    // For saving in database
    await foodModel.create(food)      
    res.json({success: true, message: 'Food Added'})
    
}
    catch (error) {
       console.log(error);
       res.json({success: false, message: 'Cannot add Food'})
    }
}
// list all food

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({success: true, data: foods})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: true, message: 'Error Found'})
    }
}

const removeFood = async (req, res) => {
    try {
        const {id} = req.body
        if(!id){
            return res.status(404).send('No Id Given')
        }
        const food = await foodModel.findById(id)
        // to remove image from upload folder
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(id)

        res.status(200).json({success: true, message: 'Product Deleted'})

    } catch (error) {
        console.log(error);
        res.status(501).json({success: false, message: 'Cannot delete'})
    }
}
module.exports = {addFood,listFood, removeFood}