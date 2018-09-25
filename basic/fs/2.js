const fs = require('fs');

fs.stat('./upload',function (err,file){
  if(err){
    fs.mkdir('./upload',function(err,file){
      if(!err){
        console.log('创建成功');
      }
    })
    return
  }
  console.log('已有目录');
})

fs.readdir('html',function(err,fileName){
  let arr = []
  if(!err){
    fileName.forEach((e,i)=>{
      fs.stat('html/' + e,function(err,file){
        if(file.isDirectory()){
          arr.push(e)
        }
        if(i == fileName.length - 1){
          console.log(arr);
        }
      })
    })
  }
})
