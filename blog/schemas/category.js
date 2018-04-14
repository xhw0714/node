var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    name : String,
    sort:{
        type:Number,
        default:1
    }
})