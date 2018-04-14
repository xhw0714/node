var express = require('express')
var router = express.Router()
var User = require('../models/user')
var category = require('../models/category')
var mongoose = require('mongoose')
router.use(function (req, res, next) {
    if (req.userInfo && req.userInfo.isAdmin){
        next()
    } else{
        res.send('您没有权限访问后台')
        return
    }
})

router.get('/',function (req, res, next) {
    res.render('admin/index',{
        userInfo:req.userInfo
    })
})

router.get('/user_index',function (req, res, next) {
    var limit = 4;
    var page = 1;
    User.count().then(function (count) {
        var maxPage = Math.ceil(count/limit)
        page = Number(req.query.page || 1)
        page = Math.min(page,maxPage)
        page = Math.max(page,1)
        var skip = limit * (page-1);
        User.find().limit(limit).skip(skip).then(function (userList) {
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                userList:userList,
                count:new Array(maxPage),
                page:page
            })
        })
    })
})
router.param('id',function (req, res, next, id) {
    req.user_id = id
    next()
})


router.get('/user/:id',function (req, res) {
    User.findOne({
        _id:req.user_id
    }).then(function (info) {
        res.render('admin/user_edit',{
            userInfo:info
        })
    })
})
router.post('/user/:id',function (req, res) {
    console.log(req.user_id)
    if(!req.body.oldPassword){
        res.render('admin/totas',{
            userInfo:req.userInfo,
            message:'旧密码不能为空'
        })
        return
    }
    if(!req.body.newPassword){
        res.render('admin/totas',{
            userInfo:req.userInfo,
            message:'修改密码不能为空'
        })
        return
    }
    if(req.body.rePassword != req.body.newPassword){
        res.render('admin/totas',{
            userInfo:req.userInfo,
            message:'两次密码不一致'
        })
        return
    }

    User.findById(req.user_id,function (err, adventure) {
        if(!err){
            if(adventure.password != req.body.oldPassword){
                res.render('admin/totas',{
                    userInfo:req.userInfo,
                    message:'旧密码错误'
                })
            } else{
                User.update({
                    _id:req.user_id
                },{
                    password:req.body.newPassword
                },function (err, raw) {
                    if(!err){
                        res.render('admin/totas',{
                            userInfo:req.userInfo,
                            message:'修改成功',
                            url:'/admin/user_index'
                        })
                    }
                })
            }
        }
    })
})

router.get('/user/del/:id',function (req, res, next) {
    User.deleteOne({
        _id:req.user_id
    },function (err) {
        if (!err){
            res.render('admin/totas',{
                userInfo:req.userInfo,
                message:'删除成功',
                url:'/admin/user_index'
            })
        }
    })
})



router.param('category_id',function (req, res, next, id) {
    req.category_id = id
    next()
})
router.get('/category/add/:category_id',function (req, res, next) {
    res.render('admin/category_add')
})
router.post('/category/add/:category_id',function (req, res, next) {
    if (req.category_id == 0){
        category.findOne({
            name:req.body.categoryName
        }).then(function (info) {
            if (info){
                res.render('admin/totas',{
                    userInfo:req.userInfo,
                    message:'已有分类'
                })
                return promise.reject()
            } else{
                return new category({
                    name:req.body.categoryName
                }).save()
            }
        }).then(function (newinfo) {
            res.render('admin/totas',{
                userInfo:req.userInfo,
                message:'添加成功',
                url:'/admin/category'
            })
        })

    }

})

module.exports = router