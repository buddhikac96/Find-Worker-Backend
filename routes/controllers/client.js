const { db, conn, spAsync } = require("../../db/index");

//Retrieve client datails from client table

const getClientDetails = (req, res) => {
  let id = req.params.id;
  spAsync("dbo.GetClientDetails", [["clientId", id]])
    .then(result => {
      delete result.recordset;
      res.status(200).json({
        status: 200,
        result: result,
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

//Insert client data ( not inserting worker skill)

const insertClientData = (req, res) => {
  let email = req.session.email;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let baseL = req.body.baseL;
  let contactno = req.body.contactno;

  spAsync("dbo.InsertClientDetails", [
    ["userEmail", email],
    ["fname", fname],
    ["lname", lname],
    ["baseL", baseL],
    ["contactno", contactno]
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

//Update Client profile picture 

const updateClientProfilePicture = (req, res) => {
  let id = req.params.id;
  let imgURL = req.body.imgURL;
 

  spAsync("dbo.insertClientProfilePicture", [
    ["clientId", id],
    ["imgURL", imgURL]
   
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


//update client data

const updateClientDetails = (req, res) => {
  let id = req.params.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let baseL = req.body.baseL;
  let contactno = req.body.contactno;

  spAsync("dbo.UpdateClientDetails", [
    ["clientId", id],
    ["fname", fname],
    ["lname", lname],
    ["baseL", baseL],
    ["contactno", contactno]
  ])
    .then(result => {
      delete result.recordset;
      res.status(200).json({
        status: 200,
        //result: result,
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

module.exports.getClientDetails = getClientDetails;
module.exports.insertClientData = insertClientData;
module.exports.updateClientDetails = updateClientDetails;
module.exports.updateClientProfilePicture = updateClientProfilePicture;
