const mongoose = require('mongoose')


const connectDB = async () => { 
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Db Connected'))
    .catch((err) => console.log(err));
}

console.log('After connectDb');



module.exports = connectDB