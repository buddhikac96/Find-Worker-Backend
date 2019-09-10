const { spAsync } = require('../../db/index');

// Get all skills 
const getAllSkills = (req,res)=>{
    spAsync("dbo.GetAllSkills").then(result=>res.send(result));
}

const getAllLocations = (req, res) => {
    spAsync("dbo.GetAllLocations").then(result=>res.send(result));
}

const getClientDetailsById = (req, res) => {
    var cilentId = req.params.id;
    spAsync("dbo.getClientDetailsById",  [['clientId', cilentId]]).then(result=>res.send(result));
}

module.exports.getAllSkills = getAllSkills;
module.exports.getAllLocations = getAllLocations;
module.exports.getClientDetailsById = getClientDetailsById;