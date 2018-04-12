var mongoose = require('mongoose')


module.exports = new mongoose.Schema({
    userName:String,
    password:String,
    isAdmin:{
        default:false,
        type:Boolean
    }
})