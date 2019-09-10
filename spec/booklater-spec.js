const request = require('request');

var search = "http://localhost:3000/bookLater/search";
var sendRequest = "http://localhost:3000/bookLater/sendRequest";

describe("Booklater routes exists", function () {
    describe("POST /booklater/search", function () {
        it("returns status code 200", function (done) {
            request.post(search, {
                "skillId": 1,
                "orderDate": "2019-09-12",
                "startTime": "08:00:00",
                "endTime": "09:00:00"
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("API Response should be valid array of json objects", function (done) {
            request.post(search, {
                "skillId": 1,
                "orderDate": "2019-09-12",
                "startTime": "08:00:00",
                "endTime": "09:00:00"
            }, function (error, response, body) {
                expect(() => {
                    JSON.parse(body);
                }).not.toThrow();
                done();
            });
        });

        describe("Responses for unexpected inputs", function() {
            it("returns status code 200 for all empty inputs", function(done){
                request.post(search, {}, function(error, response, body){
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });

            it("returns status code 200 for all null inputs", function(done){
                request.post(search, {
                    "skillId": null,
                    "orderDate": null,
                    "startTime": null,
                    "endTime": null,
                }, function(error, response, body){
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });

    describe("POST /booklater/sendRequest", function(){
        it("returns status code 500 for empty inputs", function (done) {
            request.post(sendRequest, {
                json: true,
                body: {
                }
            }, function (error, response, body) {
                console.log(body);
                expect(response.statusCode).toBe(500);
                done();
            });
        });

    });

});

///

