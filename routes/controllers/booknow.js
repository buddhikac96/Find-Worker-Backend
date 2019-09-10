const geolib = require('geolib');
const { spAsync } = require('../../db/index');
const mapConfig = require('../../config/map');

// get the center of the map by distrubution of workers
function getCenterOfMap(workerArray) {
    workersCordinatesrray = []
    for (worker of workerArray) {
        workersCordinatesrray.push({ latitude: worker.Latitude, longitude: worker.Longitude })
    }
    return geolib.getCenter(workersCordinatesrray);
}

//calculate the nearest workers by distance
function getNearestWorkers(workersArray, clientLatitude, clientLongitude) {
    console.log('distance undtion called ====================================================================')
    nearestWorkersArray = []
    for (worker of workersArray) {
        let distance = geolib.getPreciseDistance(
            { latitude: clientLatitude, longitude: clientLongitude },
            { latitude: worker.Latitude, longitude: worker.Longitude }
        );
        console.log('distance is ' + distance);
        if (distance < mapConfig.map.distance) {
            nearestWorkersArray.push(worker);
        }
    }
    return nearestWorkersArray;
}

// Retrieve nearby workers by location and skilltitle
const getNearbyWorkers = (req, res) => {
    console.log('nearest workers array called============================================')
    var jobType = req.body.jobType;
    var clientId = req.body.clientId;
    var clientCordinate = req.body.cordinate;
    console.log(jobType);
    console.log(clientId);
    console.log(clientCordinate);

    // if user provided cordinates
    if (clientCordinate) {
        console.log('function 1 called =================');
        spAsync("dbo.GetAvailableWorkersBySkill", [['SkillId', jobType]]).then(
            result => {
                let clientCordinateArr = clientCordinate.split(',');
                let clientLat = clientCordinateArr[0];
                let clientLng = clientCordinateArr[1];
                workers = result.recordset;
                let nearestWorkers = getNearestWorkers(workers, clientLat, clientLng);
                try{
                    var centerOfMap = getCenterOfMap(workers)
                } catch(err){
                    var centerOfMap = {
                        latitude: 7.8731,
                        longitude: 80.7718
                    }
                }
                res.status(201).send({
                    status: 201,
                    result: {
                        workers: nearestWorkers,
                        centerOfMap: centerOfMap
                    },
                    message: 'There are ' + workers.length + ' workers'
                });
            }
        ).catch(
            err => {
                res.status(400).send(err);
            }
        );
    } else {
        // no provided cordinates ---- has client id ---> get client location by client id and serach workers by client locatoin
        if (clientId) {
            console.log('function 2 called =================');
            console.log(clientId);
            spAsync("dbo.GetClientBaseLocatoin", [['ClientId', clientId]]).then(
                result => {
                    console.log(result);
                    if (result.recordset[0] && result.recordset[0].BaseLocation != null) {
                        console.log('function 2 if called =================');
                        var clientLocatoin = result.recordset[0].BaseLocation
                        spAsync("dbo.GetNearbyWorkers", [
                            ['jobType', jobType],
                            ['location', clientLocatoin]
                        ]).then(
                            result => {
                                workers = result.recordset;
                                try{
                                    var centerOfMap = getCenterOfMap(workers)
                                } catch(err){
                                    var centerOfMap = {
                                        latitude: 7.8731,
                                        longitude: 80.7718
                                    }
                                }
                                res.status(201).send({
                                    status: 201,
                                    result: {
                                        workers: workers,
                                        centerOfMap: centerOfMap
                                    },
                                    message: 'There are ' + workers.length + ' available workers in ' + clientLocatoin
                                });
                            }
                        ).catch(
                            err => {
                                res.status(400).send(err);
                            }
                        );
                    } else {
                        // client has logged in but base locatoin is not provided
                        console.log('function 2 else called =================');
                        spAsync("dbo.GetWorkersByJobType", [
                            ['jobType', jobType]
                        ]).then(
                            result => {
                                workers = result.recordset;
                                try{
                                    var centerOfMap = getCenterOfMap(workers)
                                } catch(err){
                                    var centerOfMap = {
                                        latitude: 7.8731,
                                        longitude: 80.7718
                                    }
                                }
                                res.status(200).send({
                                    status: 200,
                                    result: {
                                        workers: workers,
                                        centerOfMap: centerOfMap
                                    },
                                    message: 'Your Locatoin has not been set. Please update your profile to find workers accurately'
                                });
                            }
                        ).catch(
                            err => {
                                res.status(400).send(err);
                            }
                        );
                    }
                }
            );
        } else {
            // no provided cordinates---- user has not logged i
            console.log('function 3 called =================');
            spAsync("dbo.GetWorkersByJobType", [
                ['jobType', jobType]
            ]).then(
                result => {
                    workers = result.recordset;
                   
                    try{
                        var centerOfMap = getCenterOfMap(workers)
                    } catch(err){
                        var centerOfMap = {
                            latitude: 7.8731,
                            longitude: 80.7718
                        }
                    }

                    res.status(200).send({
                        status: 200,
                        result: {
                            workers: workers,
                            centerOfMap: centerOfMap = {
                                latitude: 7.8731,
                                longitude: 80.7718
                            }
                        },
                        message: 'Login to find workers in your area'
                    });
                }
            ).catch(
                err => {
                    res.status(400).send(err);
                }
            );
        }
    }
}

//send request to nearest workers ==============================================================================
const sendUrgentRequest = (req, res) => {
    today = new Date()
    var startTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var orderData = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    reqBody = req.body;
    var clientId = reqBody.clientId;
    var skillId = reqBody.jobTypeId
    var location = reqBody.location;
    var workers = reqBody.workers;

    //store request in request table
    spAsync("dbo.StoreRequest", [
        ['ClientId', clientId],
        ['StartTime', startTime],
        ['EndTime', endTime],
        ['OrderDate', orderData],
        ['SkillId', skillId],
        ['Location', location]
    ]).then(
        result => {
            var requestId = result.recordset[0].RequestId;
            for (let id of workers) {
                //add requests to request pool
                spAsync("dbo.SendRequest", [
                    ['WorkerId', id],
                    ['RequestId', requestId]
                ]).then(
                    result => { }
                ).catch(
                    err => {
                        res.status(200).send(err);
                    }
                );
            }
            res.status(200).send({
                status: 200,
                result: null,
                message: "success"
            });
        }
    );
}

module.exports.getNearbyWorkers = getNearbyWorkers;
module.exports.sendUrgentRequest = sendUrgentRequest;
