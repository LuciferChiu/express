const http = require('http')
const url = require('url')

var express = function(){
  var app = function(req,res){
    app.handle(req,res)
  }

  app.stack = []
  Object.assign(app,proto)//不想在函数里面写太长，直接复制proto上的属性就好
  
  return app
}

var proto = {
  use: function(path,fn){
    if(typeof path !== 'string'){
      fn = path
      path = '/'
    }
    this.stack.push({fn: fn,path: path})
  },

  handle: function(req,res){
    var stack = this.stack
    var index = 0
    function next(){
      var layer = stack[index++]
      var route = layer.path
      var fn = layer.fn

      var path = url.parse(req.url).pathname
      if(path.startsWith(route)){
        fn(req,res,next)
      }else{
        next()
      }
    }
    next()
  },

  listen: function(port){
    var server = http.createServer(this)
    server.listen(port)
  },
}

module.exports = express