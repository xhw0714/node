var mongoose = require('mongoose')
var categorySchema = require('./categorySchema')

module.exports = mongoose.model('category',categorySchema)