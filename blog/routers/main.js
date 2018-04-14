var express = require('express')
var router = express.Router()
var User = require("../models/user")
var category = require('../models/category')

router.get('/',function (req, res, next) {
    // console.log(req)
    category.find().then(function (info) {
        res.render('index',{
            userInfo:req.userInfo,
            categoryList:info
        })
    })

})

module.exports = router