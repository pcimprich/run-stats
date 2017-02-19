var request = require("request");

var base_url = "http://localhost:3000/"

describe("run-stats API - import", function() {
	
	describe("GET /api/import?test=1", function() {
		
		// test return code and games DTO fields
		it("should return status code 200 and new activities for import", function(done) {
			request.get(base_url + 'api/import?test=1', function(error, response, body) {
				expect(response.statusCode).toBe(200);
				
				//DTO fields
				var count = JSON.parse(body);
				expect(count.newActivities).toBe(14);
				done();
			});
		});
	});
});
