const mongoose = require('mongoose')


const connectDb = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/educert")
        .then(() => {
            console.log('connect db');
        }).catch(() => {
            console.log('disConnect db');
        })
 
}


module.exports = { connectDb }