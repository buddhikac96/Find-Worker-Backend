const express = require('express');
const request = express.Router();
const controller = require('../controllers/dataservices');

// get all skills of workers

request.get('/getallskills', (req, res) => {
    controller.getAllSkills(req,res);
});

request.get('/getalllocations', (req, res) => {
    controller.getAllLocations(req,res);
});

request.get('/getclientdetails/:id', (req, res) => {
    controller.getClientDetailsById(req, res);
});




module.exports = request;
