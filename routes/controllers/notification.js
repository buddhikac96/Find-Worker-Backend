const {db,conn, spAsync} = require('../../db/index');

const viewNotification = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetNotification",[['UserId',id]]).then(result=>{
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

const UpdateReadStatus = (req,res)=>{
    let readStatus = req.params.id;
    spAsync("dbo.UpdateReadStatus",[['NotificationId',readStatus]]).then(result=>{
        delete result.recordset;
        res.status(200).json({
            status:200,
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

module.exports.viewNotification = viewNotification
module.exports.UpdateReadStatus = UpdateReadStatus