const express = require('express');
const user = express.Router();
const controller =require('../controllers/user')


user.post('/login',(req,res)=>{
    controller.logUser(req,res)
})

user.post('/logout',(req,res)=>{
    controller.logoutUser(req,res)
})

user.post('/register',(req,res)=>{
    controller.regUser(req,res)
})

module.exports = user

