var express = require('express')
var router = express.Router()

router.get('/',function (req, res, next) {
    if(req.cookies.get('userInfo')){
        res.render('index',{
            userInfo:JSON.parse(req.cookies.get('userInfo'))
        })
    }else{
        res.render('index')
    }
})

module.exports = router