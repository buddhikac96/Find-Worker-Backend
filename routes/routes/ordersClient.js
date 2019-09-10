const express = require('express');
const queryOrder = express.Router();
const controller = require('../controllers/ordersClient');


// GET Requests by Client Id. Output Completed jobs where status=1
queryOrder.get('/completedorders/:id',(req,res)=>{
    controller.showCompletedOrders(req,res);
})

// GET Requests by Client Id. Output Upcoming jobs where Cancelled=0
queryOrder.get('/upcomingjobs/:id',(req,res)=>{
    controller.showUpcomingJobs(req,res);
})

// GET Requests by Client Id. Output Upcoming jobs where Cancelled=0
queryOrder.get('/cancelledjobs/:id',(req,res)=>{
    controller.showCancelledJobs(req,res);
}) 

module.exports = queryOrder;