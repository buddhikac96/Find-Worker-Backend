const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersWorker')

// GET OrderDetails by Order ID
router.get('/getOrderDetails/:id?',(req,res)=>{
    controller.showOrder(req,res);
})

// GET UpcomingOrders by WorkerID
router.get('/getUpComingOrders/:id?',(req,res)=>{
    controller.showUpComingOrders(req,res);
})

// GET Ongoing Orders by WorkerID
router.get('/getOngoingOrders/:id?',(req,res)=>{
    controller.showOngoingOrders(req,res);
})

// GET CompletedOrders by Worker ID
router.get('/getCompletedOrders/:id?',(req,res)=>{
    controller.showCompletedOrders(req,res);
})

// Start the order and update the order status as started
router.put('/startOrder',(req,res)=>{
    controller.startOrder(req,res);
})

// End the order and update the status and end. Calculate Charge for the Order
router.put('/endOrder',(req,res)=>{
    controller.endOrder(req,res);
})

// Cancel an order by the worker
router.put('/cancelOrder',(req,res)=>{
    controller.cancelUpComingWorkerOrder(req,res);
})

module.exports = router


