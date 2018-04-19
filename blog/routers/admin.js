var express = require('express')
var router = express.Router()
var User = require('../models/user')
var category = require('../models/category')
var content = require('../models/content')
var mongoose = require('mongoose')

router.use(function (req, res, next) {
    if (req.userInfo && req.userInfo.isAdmin) {

        next()
    } else {
        res.send('您没有权限访问后台')
        return
    }
})

router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    })
})

router.get('/user_index', function (req, res, next) {
    var limit = 4;
    var page = 1;
    User.count().then(function (count) {
        var maxPage = Math.ceil(count / limit)
        page = Number(req.query.page || 1)
        page = Math.min(page, maxPage)
        page = Math.max(page, 1)
        var skip = limit * (page - 1);
        User.find().limit(limit).skip(skip).then(function (userList) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                userList: userList,
                count: new Array(maxPage),
                page: page
            })
        })
    })
})
router.param('id', function (req, res, next, id) {
    req.user_id = id
    next()
})


router.get('/user/:id', function (req, res) {
    User.findOne({
        _id: req.user_id
    }).then(function (info) {
        res.render('admin/user_edit', {
            userInfo: info
        })
    })
})
router.post('/user/:id', function (req, res) {
    // console.log(req.user_id)
    if (!req.body.oldPassword) {
        res.render('admin/totas', {
            userInfo: req.userInfo,
            message: '旧密码不能为空'
        })
        return
    }
    if (!req.body.newPassword) {
        res.render('admin/totas', {
            userInfo: req.userInfo,
            message: '修改密码不能为空'
        })
        return
    }
    if (req.body.rePassword != req.body.newPassword) {
        res.render('admin/totas', {
            userInfo: req.userInfo,
            message: '两次密码不一致'
        })
        return
    }

    User.findById(req.user_id, function (err, adventure) {
        if (!err) {
            if (adventure.password != req.body.oldPassword) {
                res.render('admin/totas', {
                    userInfo: req.userInfo,
                    message: '旧密码错误'
                })
            } else {
                User.update({
                    _id: req.user_id
                }, {
                    password: req.body.newPassword
                }, function (err, raw) {
                    if (!err) {
                        res.render('admin/totas', {
                            userInfo: req.userInfo,
                            message: '修改成功',
                            url: '/admin/user_index'
                        })
                    }
                })
            }
        }
    })
})

router.get('/user/del/:id', function (req, res, next) {
    User.deleteOne({
        _id: req.user_id
    }, function (err) {
        if (!err) {
            res.render('admin/totas', {
                userInfo: req.userInfo,
                message: '删除成功',
                url: '/admin/user_index'
            })
        }
    })
})

router.get('/category', function (req, res, next) {
    var limit = 4;
    var page = 1;
    category.count().then(function (count) {
        var maxPage = Math.ceil(count / limit)
        page = Number(req.query.page || 1)
        page = Math.min(page, maxPage)
        page = Math.max(page, 1)
        var skip = limit * (page - 1);
        category.find().limit(limit).skip(skip).sort({sort: -1}).then(function (info) {
            res.render('admin/category', {
                userInfo: req.userInfo,
                categoryList: info,
                count: new Array(maxPage),
                page: page
            })
        })
    })
})


router.param('category_id', function (req, res, next, id) {
    req.category_id = id
    next()
})

router.get('/category/add/:category_id', function (req, res, next) {
    if (req.category_id == 0) {
        res.render('admin/category_add')
    } else {
        category.findById(req.category_id, function (err, info) {
            if (!err) {
                res.render('admin/category_add', {
                    name: info.name
                })
            }
        })
    }

})
router.post('/category/add/:category_id', function (req, res, next) {
    if (req.category_id == 0) {
        category.findOne({
            name: req.body.categoryName
        }).then(function (info) {
            if (info) {
                res.render('admin/totas', {
                    userInfo: req.userInfo,
                    message: '已有分类'
                })
                return promise.reject()
            } else {
                return new category({
                    name: req.body.categoryName
                }).save()
            }
        }).then(function (newinfo) {
            res.render('admin/totas', {
                userInfo: req.userInfo,
                message: '添加成功',
                url: '/admin/category'
            })
        })
    } else {
        category.findByIdAndUpdate(req.category_id, {
            name: req.body.categoryName
        }, function (err, info) {
            res.render('admin/totas', {
                userInfo: req.userInfo,
                message: '修改成功',
                url: '/admin/category'
            })
        })
    }
})
router.get('/category/del/:category_id', function (req, res, next) {
    category.deleteOne({
        _id: req.category_id
    }, function (err, info) {
        if (!err) {
            res.render('admin/totas', {
                userInfo: req.userInfo,
                message: '删除成功',
                url: '/admin/category'
            })
        }
    })
})

router.param('content_id', function (req, res, next, content_id) {
    req.content_id = content_id
    next()
})

router.get('/content/add/:content_id', function (req, res, next) {
    if (req.content_id == 0) {
        category.find().then(function (info) {
            res.render('admin/content_add', {
                categoryList: info
            })
        })

    }
})

router.post('/content/add/:content_id', function (req, res, next) {
    if (req.content_id == 0) {
        new content({
            category: req.body.categoryType,
            user: req.userInfo._id,
            title: req.body.title,
            des: req.body.des,
            content: req.body.content
        }).save().then(function (newinfo) {
            res.render('admin/totas', {
                userInfo: req.userInfo,
                message: '添加成功',
                url: '/admin/content'
            })
        })
    }
})

router.get('/content', function (req, res, next) {
    var limit = 4;
    var page = 1
    content.count().then(function (count) {
        var maxPage = Math.ceil(count / limit)
        page = Number(req.query.page || 1)
        page = Math.min(page, maxPage)
        page = Math.max(page, 1)
        var skip = limit * (page - 1)
        content.find().limit(limit).skip(skip).populate('category').populate('user').then(function (info) {
            res.render('admin/content', {
                userInfo: req.userInfo,
                contentList: info,
                count: new Array(maxPage),
                page: page
            })
        })
    })


})

module.exports = router