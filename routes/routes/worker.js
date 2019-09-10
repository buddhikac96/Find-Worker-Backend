const express = require("express");
const request = express.Router();
const controller = require("../controllers/worker");

//GET worker details
request.get("/profile/:id", (req, res) => {
  controller.getWorkerDetails(req, res);
});

//INSERT worker details

request.post("/profile", (req, res) => {
  controller.insertWorkerData(req, res);
});

//Update worker profile picture

request.put("/profile/picture/:id" , (req, res) => {
  controller.updateWorkerProfilePicture(req, res);
})

// Update worker details

request.put("/profile/:id", (req, res) => {
  controller.updateWorkerDetails(req, res);
});

//delete worker skill

request.delete("/skill/:id", (req, res) => {
  controller.deleteWorkerSkill(req, res);
});

//add new worker skill 

request.post("/skill/:id", (req, res) => {
  controller.addWorkerSkill(req, res);
});

//update existing worker skill

request.put("/skill/:id" , (req, res) =>{
  controller.updateWorkerSkill(req, res);
});


//update worker status

request.put("/status/:id" , (req, res) => {
  controller.updateWorkerStatus(req, res);
});



module.exports = request;
