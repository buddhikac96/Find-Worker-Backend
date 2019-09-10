const {db,conn, spAsync} = require('../../db/index');
//View worker Ratings in worker
const viewRatings = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetRatings",[['WorkerId',id]]).then(result=>{
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

//Insert Ratings to Orders

const insertRatings = (req, res) => {
  
    let OrderId=req.body.OrderId;
    let Rate = req.body.Rate;
    
    spAsync("dbo.InsertRatings", [
        ["OrderId", OrderId],
      ["Rate", Rate]
      
    ])
      .then(result => {
        delete result.recordset;
        res.status(200).json({
          status: 200,
          // result: result,
          message: "OK"
        });
      })
      .catch(err => {
        res.send(500).json({
          status: 500,
          result: err,
          message: "Internal Server Error"
        });
      });
  };

//View worker Ratings in worker
const viewFeedbacks = (req,res)=>{
    let id = req.params.id;
    spAsync("dbo.GetReview",[['WorkerId',id]]).then(result=>{
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

//Insert Feedbacks to Orders
const insertFeedbacks = (req, res) => {
  
    let OrderId=req.body.OrderId;
    let Review = req.body.Review;

    spAsync("dbo.Insertfeedback", [
        ["OrderId", OrderId],
      ["Review", Review]
      
    ])
      .then(result => {
        delete result.recordset;
        res.status(200).json({
          status: 200,
          // result: result,
          message: "OK"
        });
      })
      .catch(err => {
        res.send(500).json({
          status: 500,
          result: err,
          message: "Internal Server Error"
        });
      });
  };

module.exports.viewRatings = viewRatings
module.exports.insertRatings = insertRatings
module.exports.insertFeedbacks = insertFeedbacks
module.exports.viewFeedbacks = viewFeedbacks