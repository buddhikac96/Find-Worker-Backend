const {db,conn, spAsync} = require('../../db/index');

const showCompletedOrders = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetCompletedOrder",[['ClientId',id]]).then(result=>{
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


const showUpcomingJobs = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetUpcomingOrders",[['ClientId',id]]).then(result=>{
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

const showCancelledJobs = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetCancelledOrders",[['ClientId',id]]).then(result=>{
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


module.exports.showCompletedOrders = showCompletedOrders
module.exports.showUpcomingJobs = showUpcomingJobs
module.exports.showCancelledJobs = showCancelledJobs