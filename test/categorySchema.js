var mongoose = require('mongoose')
var category = require('./category')

var categorySchema = mongoose.Schema({
    name:String,
    childCategory:[category]
})
categorySchema.methods.addChildCategory = function(id,cb){
    this.model('category').findById(id,cb)
}

module.exports = categorySchema