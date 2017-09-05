const http = require('http')
const url = require('url')
const querystring = require('querystring')
const express = require('./simpleExpress')
const articles = {
  '1': '第一篇文章详情：吧啦吧啦吧',
  '2': '第二篇文章详情：啦啦啦啦啦',
  '3': '第三篇文章详情：哈哈哈哈哈'
}


var app = express()

app.use(function(req,res,next){
  var urlObj = url.parse(req.url,true)
  var pathName = urlObj.pathname
  var query = urlObj.query
  req.path = pathName
  req.query = query
  next()
})

app.use(function(req,res,next){
  res.send = function(html){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.end(html)
  }
  next()
})

app.use(function(req,res){
  if(req.path == '/'){
    res.send('<ul><li><a href="/article?id=1">第一篇文章</a></li><li><a href="/article?id=2">第一篇文章</a></li><li><a href="/article?id=3">第一篇文章</a></li></ul>')
  }else if(req.path == '/article'){
    res.send(articles[req.query.id])
  }else{
    res.end('404')
  }
})

var server = http.createServer(app)

server.listen(8080)
