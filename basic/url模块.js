const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
  if(req.url != '/favicon.ico'){
    let result = url.parse(req.url,true);
    console.log(result.query);
  }
  
  res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
  res.write('你好，node')
  res.end()

}).listen(9111)
