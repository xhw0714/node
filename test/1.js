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
        new category({name:req.body.name,pid:req.params.id}).save(function (err) {
            if (!err){
                resData.message = '保存成功'
                res.json(resData)
            }
        })
    }
})

app.get('/category',function (req, res, next) {
    category.find().sort({name:-1}).then(function (info) {
        // console.log(info)
        if (info){
            var arr = [];
            var newinfo = JSON.parse(JSON.stringify(info))
            for (var i = 0,len = newinfo.length;i<len;i++){
                newinfo[i].child = []
                newinfo[i].child[0]
                if(!newinfo[i].pid) {
                    arr.push(newinfo[i])
                }
                for (var j = 0;j<len;j++){
                    if (newinfo[i]._id == newinfo[j].pid){
                        newinfo[i].child.push(newinfo[j])
                    }
                }
            }
        }
        res.json({data:arr})
    })
})