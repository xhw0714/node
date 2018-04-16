var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    updateTime: {
        type: Number,
        default:Date.now()
    },
    view: {
        type: Number,
        default: 0
    },
    title: String,
    des: String,
    content: String
})
