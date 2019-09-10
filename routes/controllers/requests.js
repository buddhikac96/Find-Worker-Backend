const {db,conn, spAsync} = require('../../db/index');

//===========================================================================
// Retrieves Requests from the Database by ID or All=========================
const showRequests = (req,res)=>{
    let id = req.params.id;
    if(id === undefined){
        spAsync("dbo.SelectAllRequests").then(result=>{
            delete result.recordset
            res.status(200).json({
                status:200,
                result:result,
                message:"OK"})
        
        })
        .catch(err=>{
            res.send(500).json({
                status:500,    
                result:err,
                message:"Internal Server Error"
            })
        })     
    }
    else{ 
        spAsync("dbo.SelectRequestById",[['RequestId',id]]).then(result=>res.send(result))   
    }
}


//===========================================================================
// Update Request by ID======================================================
const updateRequest = (req,res)=>{
    let params =[]
    params.push(['RequestId',req.params.id])   
    Object.keys(req.body).forEach(key=>{
        // if(key==="StartTime" || key==="EndTime"){
        //     req.body[key] = new Date('1970-01-01T' + req.body[key] + 'Z')
        // }
        // if(key==="OrderDate"){
        //     req.body[key] = new Date(req.body[key])
        //     params.push([key,req.body[key]])
        // }
        // else{
            params.push([key,req.body[key]])
        // }
    })
    spAsync("dbo.UpdateRequests",params).then(result=>{
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
        console.error(err)
    })
}
//===========================================================================
//GET Request by Owner ID ===================================================
const ReqByOwner = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.getRequestByOwner",[['ClientId',id]]).then(result=>{
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
//===========================================================================
//DELETES Request by Request ID =============================================
const deleteRequest=(req,res)=>{
    let id = req.params.id;
    spAsync("dbo.DeleteRequest",[['RequestId',id]]).then(result=>{
        res.status(200).json({
            status:200,
            result:result,
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
//===========================================================================
// Worker function for accepting a request and then Converting it to an order
const AcceptRequest = async (req,res)=>{
    let id = req.params.id
    let w_id = req.body.WorkerId;
    let params =[];

    var Request = await spAsync("dbo.SelectRequestById",[['RequestId',id]]).then(result=>{
        // res.status(200).json({
        //     status:200,
        //     message:"Ok"
        // })
        return result
    })
    try{
        
        Object.keys(Request.recordset[0]).forEach((key,i)=>{

            if(i>1){
                if(key==="StartTime" || key==="ExpectedEndTime"){
                    Request.recordset[0][key] = new Date(Request.recordset[0][key]).toTimeString().split(' ')[0]
                }
                if(key==="OrderDate"){
                    Request.recordset[0][key] = new Date(Request.recordset[0][key])
                    params.push([key,Request.recordset[0][key]])
                }
                else{
                    params.push([key,Request.recordset[0][key]])
                }
            }
    
        })
        spAsync("dbo.InsertRequestNotification", [['Msg','Your Order Has Been Placed'],['Receiver', params[0][1]], ['MsgType',1],['ORIds', Request.recordset[0].RequestId], ['ReadStatus', 0]])
        params.push(['WorkerId',req.body.WorkerId],['RequestId',Request.recordset[0].RequestId])



        spAsync('dbo.InsertOrder',params).then(result=>{
            res.status(200).json({
                status:200,
                result:result,
                message:"OK"
            })
        })
        .catch(err=>{
            res.status(500).json({
                status:500,
                result:result,
                message:"Internal Server Error"
            })
        })
    }
    catch(err){

        res.status(200).json({
            status:404,
            result:err,
            message:"Entry Not Found"
        })
    }
    
}

//===========================================================================
//Request Pool Controller ===================================================
const RequestPool = (req,res)=>{
    console.log([Object.keys(req.params)[0],req.params[Object.keys(req.params)[0]]])
        spAsync('dbo.SelectReqPool',[[Object.keys(req.params)[0],req.params[Object.keys(req.params)[0]]]])
        .then(result=>{
            if(result.recordsets[0]){
                res.status(200).json({
                    status:200,
                    result:result.recordsets,
                    message:"ok"
                })
            }
            else{
                res.status(200).json({
                    status:404,
                    message:"Entry Not Found"
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                status:500,
                result:err,
                message:"Internal Server Error"
            })
        })
    }


module.exports.RequestPool = RequestPool
module.exports.AcceptRequest = AcceptRequest
module.exports.deleteRequest = deleteRequest
module.exports.ReqByOwner = ReqByOwner
module.exports.updateRequest = updateRequest
module.exports.showRequests = showRequests