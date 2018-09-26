
const fs = require('fs');

// const readStream = fs.createReadStream('1.txt');
// let str = ''
//
// readStream.on('data',function(chunk){
//   str += chunk
// })
// readStream.on('end',function(){
//   console.log(str);
// })
// readStream.on('error',function(err){
//   console.log(errs);
// })

// const writeStream = fs.createWriteStream('output.txt');
//
// writeStream.write('这是写入的数据','utf8');
//
// writeStream.end();
//
// writeStream.on('finish',function(){
//   console.log('写入成功');
// })
//
// writeStream.on('error',function(err){
//   console.log(err);
// })

const readStream = fs.createReadStream('1.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream)
