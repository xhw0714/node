const fs = require('fs');

fs.stat('../http模块.js',(err,stats)=>{
  console.log(stats.isDirectory())
})

// fs.writeFile('./1.txt', '写入文件', (err)=>{
//
// })
fs.appendFile('./1.txt','写入文件\n',()=>{

})
