const express = require('express');
const rating = express.Router();
const controller = require('../controllers/ratings')

// GET Ratings by Worker Id
rating.get('/ratings/:id',(req,res)=>{
    controller.viewRatings(req,res)
})

// Insert ratings by Worker Id 
rating.post('/insert-ratings',(req,res)=>{
    controller.insertRatings(req,res)
})

// GET Feedback by Worker Id
rating.get('/reviews/:id',(req,res)=>{
    controller.viewFeedbacks(req,res)
})

// Insert Feedback by Worker Id and Skill Id
rating.post('/insert-reviews',(req,res)=>{
    controller.insertFeedbacks(req,res)
})

module.exports = rating