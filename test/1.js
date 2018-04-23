var app = require('express')();
var mongoose = require('mongoose')
var category = require('./category')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var resData ;
app.use(function (req,res,next) {
    resData = {
        code:0,
        message:''
    }
    next()
})

mongoose.connect('mongodb://localhost:20111',function (err) {
    if (err){
        console.log('数据库连接失败')
    } else{
        console.log('数据库连接成功')
        app.listen('8889')
    }
})



app.post('/category/add/:id',function (req, res, next) {
    if(req.params.id == 0){
        // console.log(req.body.name)
        new category({name:req.body.name}).save(function (err) {
            if (!err){
                resData.message = '保存成功'
                res.json(resData)
            }
        })
    }else{
        // console.log(req.body.name)
        // var name = req.body.name
        (new category).addChildCategory(req.params.id,function (err,info) {
            if(!err){
                info.childCategory.push(new category({name:req.body.name}))
                // info.name = 'Css'
                info.save()
                resData.message = '保存成功'
                res.json(resData)
            }
        })
    }
})