const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer((req,res) => {


  let pathName = req.url;
  if(pathName !== '/favicon.ico'){
    if(pathName == '/'){
      pathName = '/index.html'
    }
    fs.readFile('static'+pathName,(err,data)=>{
      if(!err){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end()
      }
    })
  }


}).listen('8081')
