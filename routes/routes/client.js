const express = require("express");
const request = express.Router();
const controller = require("../controllers/client");

//GET client details
request.get("/profile/:id", (req, res) => {
  controller.getClientDetails(req, res);
});

//INSERT client details

request.post("/profile", (req, res) => {
  controller.insertClientData(req, res);
});

//Update client profile picture

request.put("/profile/picture/:id", (req, res) => {
  controller.updateClientProfilePicture(req, res);
})

// Update client details

request.put("/profile/:id", (req, res) => {
  controller.updateClientDetails(req, res);
});



module.exports = request;