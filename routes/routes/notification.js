const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification')

// GET All Notifications Define With ReadStatus
router.get('/getNotifications/:id',(req,res)=>{
    controller.viewNotification(req,res);
})

// Update ReadStatus when user reads notification
router.post('/:id',(req,res)=>{
    controller.UpdateReadStatus(req,res);
})

module.exports = router