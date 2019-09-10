const { db, conn, spAsync } = require("../../db/index");

//Retrieve worker datails from worker table

const getWorkerDetails = (req, res) => {
  let id = req.params.id;
  spAsync("dbo.getWorkerDetails", [["workerId", id]])
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

//Insert worker data ( not inserting worker skill)

const insertWorkerData = (req, res) => {
  let email = req.session.email;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let baseL = req.body.baseL;
  let status = req.body.status;
  let contactno = req.body.contactno;

  spAsync("dbo.InsertWorkerDetails", [
    ["userEmail", email],
    ["fname", fname],
    ["lname", lname],
    ["baseL", baseL],
    ["status", status],
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

//Update worker profile picture

const updateWorkerProfilePicture = (req, res) => {
  let id = req.params.id;
  let imgURL = req.body.imgURL;
  spAsync("dbo.insertWorkerProfilePicture", [
    ["workerId", id],
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
}

//update worker data

const updateWorkerDetails = (req, res) => {
  let id = req.params.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let baseL = req.body.baseL;
  let contactno = req.body.contactno;

  spAsync("dbo.UpdateWorkerDetails", [
    ["workerId", id],
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

// Delete worker skill

const deleteWorkerSkill = (req, res) => {
  let id = req.params.id;
  let skillId = req.body.skillId;
  
  spAsync("dbo.DeleteWorkerSkill", [["workerId", id], ["skillId", skillId]])
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

// Insert new worker skill

const addWorkerSkill = (req, res) => {
  let id = req.params.id;
  let skillObj = req.body.skillObj;
  console.log(JSON.stringify(skillObj));
  for (let x = 0; x < skillObj.length; x++) {
    skillObj[x].workerid = id;
  }

  spAsync("dbo.AddNewSkillToWorkerSkill", [
    ["workerid", id],
    ["json", JSON.stringify(skillObj)]
  ])
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

//Update existing worker skill

const updateWorkerSkill = (req, res) => {
  let id = req.params.id;
  let skillObj = req.body.skillObj;

  for (let x = 0; x < skillObj.length; x++) {
    skillObj[x].workerid = id;
  }

  spAsync("dbo.UpdateWorkerSkill", [["json", JSON.stringify(skillObj)]])
    .then(result => {
      console.log(result);
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



//Update worker status 

const updateWorkerStatus = (req, res) => {
  let id = req.params.id;
  let status = req.body.status;

  spAsync("dbo.UpdateWorkerStatus", [
    ["workerId", id],
    ["status", status]
   
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
}

module.exports.getWorkerDetails = getWorkerDetails;
module.exports.insertWorkerData = insertWorkerData;
module.exports.updateWorkerDetails = updateWorkerDetails;
module.exports.deleteWorkerSkill = deleteWorkerSkill;
module.exports.addWorkerSkill = addWorkerSkill;
module.exports.updateWorkerSkill = updateWorkerSkill;
module.exports.updateWorkerProfilePicture = updateWorkerProfilePicture ;
module.exports.updateWorkerStatus = updateWorkerStatus;
