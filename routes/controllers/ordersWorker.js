const {db,conn, spAsync} = require('../../db/index');

// Show upcoming orders of the worker 
const showUpComingOrders = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetWorkerUpComingOrders",[['WorkerId',id]]).then(result=>{
        res.status(200).json({
            status:200,
            result:result.recordsets,
            message:"Ok"
        })
    })
    .catch(err=>{
        res.status(500).json({
            status:500,
            result:err,
            message:"Internal Server Error"
        })
    })
}


//Show orders completed by the worker
const showCompletedOrders = (req,res)=>{
    let id = req.params.id;

    spAsync("dbo.GetWorkerCompletedOrders",[['WorkerId',id]]).then(result=>{
        res.status(200).json({
            status:200,
            result:result.recordsets,
            message:"Ok",
        })
    })
    .catch(err=>{
        res.status(500).json({
            status:500,
            result:err,
            message:"Internal Server Error"
        })
    })
}

//Show ongoing orders of the worker
const showOngoingOrders = (req,res)=>{
    let id = req.params.id;

    spAsync("dbo.GetWorkerOngoingOrders",[['WorkerId',id]]).then(result=>{
        res.status(200).json({
            status:200,
            result:result.recordsets,
            message:"Ok",
        })
    })
    .catch(err=>{
        res.status(500).json({
            status:500,
            result:err,
            message:"Internal Server Error"
        })
    })
}

//Show an order

const showOrder = (req,res)=>{
    let id = req.params.id;

    spAsync("dbo.GetOrderDetails",[['OrderId',id]]).then(result=>{
        res.status(200).json({
            status:200,
            result:result.recordsets,
            message:"Ok"
        })
    })
    .catch(err=>{
        res.status(500).json({
            status:500,
            result:err,
            message:"Internal Server Error"
        })
    })
}


// Start Order
const startOrder = (req,res)=>{
    let params =[]
    params.push(['OrderId',req.body.OrderId]);
    params.push(['StartTime',req.body.StartTime]);

    spAsync("dbo.StartOrder",params).then(result=>{
        res.status(200).json({
            status:200,
            result:result,
            message:"OK"      
        })  
        }).catch(err=>{
        res.send(500).json({
            status:500,    
            result:err,
            message:"Internal Server Error"
        })
    })
}

// End Order
const endOrder = (req,res)=>{
    let params =[]  
    params.push(['OrderId',req.body.OrderId]);
    params.push(['StartTime',req.body.StartTime]);
    params.push(['EndTime',req.body.EndTime]);

    spAsync("dbo.EndOrder",params).then(result=>{
        res.status(200).json({
            status:200,
            result:result,
            message:"OK"      
        })
        }).catch(err=>{
        res.send(500).json({
            status:500,    
            result:err,
            message:"Internal Server Error"
        })
    })
}

// Cancel an upComing Order by worker
const cancelUpComingWorkerOrder = (req,res)=>{
    let params =[]
    params.push(['OrderId',req.body.OrderId]);
    params.push(['Reason',req.body.Reason]);

    spAsync("dbo.CancelUpComingWorkerOrder",params).then(result=>{
        res.status(200).json({
            status:200,
            result:result,
            message:"OK"      
        })
        }).catch(err=>{
        res.send(500).json({
            status:500,    
            result:err,
            message:"Internal Server Error"
        })
    })
}

module.exports.showUpComingOrders = showUpComingOrders
module.exports.showCompletedOrders=showCompletedOrders
module.exports.showOngoingOrders=showOngoingOrders
module.exports.showOrder=showOrder
module.exports.startOrder=startOrder
module.exports.endOrder=endOrder
module.exports.cancelUpComingWorkerOrder=cancelUpComingWorkerOrder