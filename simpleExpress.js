const http = require('http')


var express = function(){
  var app = function(req,res){
    app.handle(req,res)
  }

  app.stack = []
  Object.assign(app,proto)//不想在函数里面写太长，直接复制proto上的属性就好
  
  return app
}

var proto = {
  use: function(fn){
    this.stack.push(fn)
  },

  handle: function(req,res){
    var stack = this.stack
    var index = 0
    function next(){
      stack[index++](req,res,next)
    }
    next()
  },
}
module.exports = express