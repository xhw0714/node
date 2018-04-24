var mongoose = require('mongoose')
var category = require('./category')

var categorySchema = mongoose.Schema({
    name:String,
    pid:String
})

module.exports = categorySchema