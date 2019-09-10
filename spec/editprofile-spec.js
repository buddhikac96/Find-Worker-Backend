const request = require("request");
let getWorkerProfile = "http://localhost:3000/worker/profile/184";
let updateWorkerProfile = "http://localhost:3000/worker/profile/184";
let updateWorkerProfilePicture =
  "http://localhost:3000/worker/profile/picture/184";
let deleteWorkerSkill = "http://localhost:3000/worker/skill/184";
let updateWorkerStatus = "http://localhost:3000/worker/status/184";
let insertWorkerSkill = "http://localhost:3000/worker/skill/184";
let getClientDetails = "http://localhost:3000/client/profile/188";
let updateClientDetails = "http://localhost:3000/client/profile/188";
let updateClientProfilePicture =
  "http://localhost:3000/client/profile/picture/188";

describe("Edit Profile", function() {
  describe("GET /", function() {
    //get worker profile details
    it("returns response code 200", function(done) {
      request.get(getWorkerProfile, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    //get client details
    it("returns response code 200", function(done) {
      request.get(getClientDetails, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("PUT /", function() {
    //update worker profile details
    it("returns response code 200", function(done) {
      request.put(
        updateWorkerProfile,
        {
          fname: "Thilakshi",
          lname: "Fonseka",
          baseL: "Maharagama",
          contactno: "0712345678"
        },
        function(error, response, body) {
          //console.log(response);
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });

    //update client profile details
    it("returns response code 200", function(done) {
      request.put(
        updateClientDetails,
        {
          fname: "Kavindu",
          lname: "Prabath",
          baseL: "Maharagama",
          contactno: "0712345678"
        },
        function(error, response, body) {
          //console.log(response);
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
  });
});
