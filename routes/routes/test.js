//test route
const express = require('express');
const test = express.Router();
const controller =require('../controllers/test')

test.get('/foo',(req,res)=>{
    controller.foo(req,res)        
})
module.exports = test;
