const express = require('express');
const search = express.Router();
const searchController = require('../controllers/bookLater');

//Find available workers and display
search.post('/search', (req, res) => {
    searchController.getAvailableWorkers(req, res); 
});

//Send request to available workers
search.post('/sendRequest', (req, res) => {
    searchController.sendRequest(req, res);
});

module.exports = search;