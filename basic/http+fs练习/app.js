const fs = require('fs');
const http = require('http');
const url = require('url');
const mime = require('./mimeModel');
const path = require('path');
http.createServer((req,res) => {
  let pathName = url.parse(req.url).pathname;

  if(pathName !== '/favicon.ico'){
    if(pathName == '/'){
      pathName = '/index.html'
    }

    fs.readFile('static'+pathName,(err,data)=>{
      if(!err){
        let extname = path.extname(pathName)
        res.writeHead(200,{'Content-Type':mime[extname]})
        res.write(data)
        res.end()
      }else{
        fs.readFile('static/404.html',(err,data)=>{
          if(!err){
            res.writeHead(404,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
          }
        })
      }
    })
  }


}).listen('8081')
