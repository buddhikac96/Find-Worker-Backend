const { db, conn, spAsync } = require('../../db/index');
const geolib = require('geolib');

//Initial distance checked in meters
const configDistance = 10000;

//Function to get available worker list
const getAvailableWorkers = (req, res) => {

    var User = {
        skillId: req.body.skillId,
        orderDate: req.body.orderDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        clientId: "",
        locationLat: "",
        locationLng: "",
        baseLocation: "",
    };

    var Workers = [];
    var sp, params;

    //If client provides specific location for request
    if (req.body.coordinates) {
        var location = req.body.coordinates.split(',');
        User.locationLat = location[0];
        User.locationLng = location[1];
        sp = "dbo.GetAvailableWorkers";
        params = [['SkillId', User.skillId], ['Date', User.orderDate], ['OrderStartTime', User.startTime]];
    }
    else {
        //if client has not given location but is logged in take base location
        if (req.body.clientId) {
            User.clientId = req.body.clientId;
            sp = "dbo.GetAvailableWorkersByBaseLocation";
            params = [['SkillId', User.skillId], ['Date', User.orderDate], ['OrderStartTime', User.startTime], ['ClientId', User.clientId]];
        }
        //if client has not given location and not logged in show all available workers in the country
        else {
            sp = "dbo.GetAllAvailableWorkers";
            params = [['SkillId', User.skillId], ['Date', User.orderDate], ['OrderStartTime', User.startTime]]
        }
    }
    console.log(sp,params)
    spAsync(sp, params).then(
        result => {
            //no workers are available
            console.log(result)
            if (result.recordset.length === 0) {
                res.status(200).send({
                    status: 200,
                    result: "",
                    message: "No workers available"
                });
            }
            else {
                //check distance between client and worker by coordinates if location given
                if(User.coordinates){
                    for (var i = 0; i < result.recordset.length; i++) {
                        //filtering based on distance to request location
                        var distance = geolib.getDistance(
                            { latitude: result.recordset[i].Latitude, longitude: result.recordset[i].Longitude },
                            { latitude: User.locationLat, longitude: User.locationLng }
                        )
                        if (distance <= configDistance) {
                            Workers.push({
                                workerId: result.recordset[i].WorkerId,
                                firstName: result.recordset[i].FirstName,
                                lastName: result.recordset[i].LastName,
                                baseLocation: result.recordset[i].BaseLocation,
                                rate: result.recordset[i].Rate,
                                imgUrl: result.recordset[i].ImgUrl,
                                skillDescription: result.recordset[i].Description,
                                hourlyCharge: result.recordset[i].HourlyCharge
                            });
                        }
                    }
    
                }
                else{
                    //set base location and get workers
                    User.baseLocation = result.recordset[0].BaseLocation;
                    for (var i = 0; i < result.recordset.length; i++) {
                        Workers.push({
                            workerId: result.recordset[i].WorkerId,
                            firstName: result.recordset[i].FirstName,
                            lastName: result.recordset[i].LastName,
                            baseLocation: result.recordset[i].BaseLocation,
                            rate: result.recordset[i].Rate,
                            imgUrl: result.recordset[i].ImgUrl,
                            skillDescription: result.recordset[i].Description,
                            hourlyCharge: result.recordset[i].HourlyCharge
                        });
                    }
                }
                
                res.status(200).json({
                    status: 200,
                    result: { Workers, User },
                    message: "OK"
                })
            }

        }).catch(err => {
            res.status(500).json({
                status: 500,
                result: err,
                message: "Internal Server Error"
            });
        });
    }
 
 //Send request to workers and update request pool
 const sendRequest = (req, res) => {
     var User = req.body.User;
     var Workers = req.body.Workers;
     var WorkerList = [];

     if(Workers.length==0){
         res.status(500).send({
             status: 500,
             result: '',
             message: "Empty worker list - cannot send reuqests"
         });
     }
     else{
        for (var i = 0; i < Workers.length; i++) {
            WorkerList.push(Workers[i].workerId);
        }
     }     

     var params;
     //if location coordinates are available
     if(User.locationLat=="" || User.locationLng==""){
         params = [['ClientId', User.clientId], ['StartTime', User.startTime], ['EndTime', User.endTime], ['OrderDate', User.orderDate], ['Location', User.baseLocation], ['SkillId', User.skillId]];
     }
    
     else{
         params = [['ClientId', User.clientId], ['StartTime', User.startTime], ['EndTime', User.endTime], ['OrderDate', User.orderDate], ['Location', User.locationLat + ',' + User.locationLng], ['SkillId', User.skillId]];
     }
 
     //insert request into Request table
     spAsync("dbo.StoreRequest", params)
         .then(result => {
             var requestId = result.recordset[0].RequestId;
             for (var i = 0; i < WorkerList.length; i++) {
                 //insert requests to request pool
                 spAsync("dbo.SendRequest", [['WorkerId', WorkerList[i]], ['RequestId', requestId]]);
                 spAsync("dbo.InsertRequestNotification", [['Msg', 'You Have Recieve a Work Request'], ['Receiver', WorkerList[i]], ['MsgType', 0], ['ORIds', requestId], ['ReadStatus', 0]])
                     .then(result => {
                         
                     }).catch(err => {
                         res.status(500).json({
                             status: 500,
                             result: err,
                             message: "Internal Server Error"
                         })
                     })
             }
             res.status(200).send({
                 status: 200,
                 result: "",
                 message: "Request sent to workers and stored in request table"
             });
         }).catch(err => {
             res.status(500).json({
                 status: 500,
                 result: err,
                 message: "Internal Server Error"
             })
         }) 
}

module.exports.getAvailableWorkers = getAvailableWorkers;
module.exports.sendRequest = sendRequest;