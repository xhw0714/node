var express = require('express')
var swig = require('swig')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookies = require('cookies')
var User = require('./models/user')
var app = express()
//设置引擎为swig
app.engine('html',swig.renderFile)
//设置HTML为模板
app.set('view engine','html')
//模板目录，第一个参数必须为views
app.set('views','./web')
//静态文件配置
app.use('/html',express.static(__dirname + '/html'))
app.use(bodyParser.urlencoded({extended:true}))

app.use(function (req, res, next) {
    req.cookies = new cookies(req,res)
    var userInfo = req.cookies.get('userInfo');
    if(userInfo){
        User.findById(JSON.parse(userInfo)._id).then(function (info) {
            req.userInfo = info
            next()
        })
    }else{
        next()
    }

})
swig.setDefaults({
    cache:false
})
//引用模块
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

//mogoose连接数据库
mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    if (err){
        console.log('数据库连接失败')
    } else{
        console.log('数据库连接成功')
        app.listen('8887')
    }
})
