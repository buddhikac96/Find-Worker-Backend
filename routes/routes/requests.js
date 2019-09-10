const express = require('express');
const request = express.Router();
const controller = require('../controllers/requests')


// GET Requests by Request ID or Show All
request.get('/show/:id?',(req,res)=>{
    controller.showRequests(req,res);
})

// GET Requests by Client Id
request.get('/owner/:id',(req,res)=>{
    controller.ReqByOwner(req,res)
})

// UPDATE Request by ID
request.put('/update/:id',(req,res)=>{
    controller.updateRequest(req,res);
})

//DELETE Request by ID
request.delete('/delete/:id',(req,res)=>{
    controller.deleteRequest(req,res);
})

//Accept Request by ID
request.post('/accept/:id',(req,res)=>{
    controller.AcceptRequest(req,res);
})

//GET Request Pool by Request ID
request.get('/pool/:RequestId',(req,res)=>{
    controller.RequestPool(req,res)
})

//GET Request Pool by Worker ID
request.get('/pool/worker/:WorkerId',(req,res)=>{
    controller.RequestPool(req,res)
})

module.exports = request