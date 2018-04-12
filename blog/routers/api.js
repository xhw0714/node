var express = require('express')
var router = express.Router()
var User = require('../models/user')

var responseData;

router.use(function (req, res, next) {
    responseData = {
        code:0,
        message:''
    }
    next()
})

router.post('/user/register',function (req, res, next) {

    if (req.body.userName == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (req.body.password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if (req.body.password != req.body.rePassword){
        responseData.code = 3;
        responseData.message = '密码不一致'
        res.json(responseData)
        return
    }

    User.findOne({
        userName:req.body.userName
    }).then(function (info) {
        if (info) {
            responseData.code = 4
            responseData.message = '用户名已存在'
            res.json(responseData)
            return
        }
        return new User({
            userName:req.body.userName,
            password:req.body.password
        }).save()
    }).then(function (newInfo) {
        console.log(newInfo)
        responseData.message = '注册成功'
        res.json(responseData)
        next()
    })
})

router.post('/user/login',function (req, res, next) {
    if (req.body.userName == ''){
        responseData.message = '用户名不能为空'
        responseData.code = 1
        res.json(responseData)
        return
    }
    if (req.body.password == ''){
        responseData.message = '密码不能为空'
        responseData.code = 2
        res.json(responseData)
        return
    }
    User.findOne({
        userName:req.body.userName,
        password:req.body.password
    }).then(function (info) {
        // console.log(info)
        if (info) {
            responseData.message = '登录成功'
            responseData.userInfo = {
                userName:info.userName,
                _id:info._id
            }
            req.cookies.set('userInfo',JSON.stringify({
                userName:info.userName,
                _id:info._id
            }))
            res.json(responseData)
            next()
        }else{
            responseData.message = '账号或者密码错误'
            responseData.code = 403
            res.json(responseData)
            return
        }
    })
})

router.get('/user/loginOut',function (req, res, next) {
    req.cookies.set('userInfo',null)
    res.send({message:'退出成功'})
    next()
})

module.exports = router