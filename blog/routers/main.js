var express = require('express')
var router = express.Router()
var User = require("../models/user")

router.get('/',function (req, res, next) {
    console.log(req)
    res.render('index',{
        userInfo:req.userInfo
    })
})

module.exports = router