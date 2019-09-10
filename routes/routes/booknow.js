const express = require('express');
const request = express.Router();
const controller = require('../controllers/booknow')

//get workers by location and skill

request.post('/booknow', (req, res) => {
    controller.getNearbyWorkers(req,res);
});

request.post('/sendUrgentRequest', (req, res) => {
    controller.sendUrgentRequest(req,res);
});


module.exports = request