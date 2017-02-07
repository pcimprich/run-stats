var request = require("request");

var base_url = "http://localhost:3000/"

describe("run-stats API - stats", function() {
	
	describe("GET /api/stats", function() {
		
		// test return code and games DTO fields
		it("should return status code 200 and total stats", function(done) {
			request.get(base_url + 'api/stats/total', function(error, response, body) {
				expect(response.statusCode).toBe(200);
				
				//DTO fields
				var run = JSON.parse(body);
				expect(run.count).toBeGreaterThan(run.maxDistance);
				expect(run.distance).toBeGreaterThan(0);
				expect(run.duration).toBeDefined();
				expect(run.elevation).toBeGreaterThan(0);
				expect(run.maxDistance).toBeGreaterThan(0);
				done();
			});
		});
	});
});
