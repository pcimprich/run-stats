var request = require("request");

var base_url = "http://localhost:3000/"

describe("run-stats API - runs", function() {
	
	describe("GET /api/runs", function() {
		
		// test return code and games DTO fields
		it("should return status code 200 and all runs", function(done) {
			request.get(base_url + 'api/runs', function(error, response, body) {
				expect(response.statusCode).toBe(200);
				
				//DTO fields
				var run = JSON.parse(body);
				expect(run[0].id).toBeDefined();
				expect(run[0].date).toBeDefined();
				expect(run[1].year).toBeDefined();
				expect(run[1].time).toBeDefined();
				expect(run[5].distance).toBeGreaterThan(0);
				expect(run[5].duration).toBeDefined();
				expect(run[10].pace).toBeDefined();
				expect(run[10].kcal).toBeDefined();
				expect(run[8].elevation).toBeDefined();
				expect(run[8].cadence).toBeDefined();
				expect(run[3].steps).toBeDefined();
				expect(run[3].location).toBeDefined();
				expect(run[9].steps).toBeDefined();
				expect(run[9].source).toBeDefined();
				expect(run[9].notes).toBeDefined();
				done();
			});
		});	
		
		it("should return status code 200 and all runs for a year", function(done) {
			request.get(base_url + 'api/runs?year=2015', function(error, response, body) {
				expect(response.statusCode).toBe(200);
				
				//DTO fields
				var run = JSON.parse(body);
				expect(run[0].year).toBe(2015);
				expect(run[1].year).toBe(2015);
				done();
			});
		});	
			
		// test return code and games DTO fields
		it("should return status code 200 and one run", function(done) {
			request.get(base_url + 'api/runs/10', function(error, response, body) {
				expect(response.statusCode).toBe(200);
				
				//DTO fields
				var run = JSON.parse(body);
				expect(run.id).toBeDefined();
				expect(run.date).toBeDefined();
				expect(run.year).toBeDefined();
				expect(run.time).toBeDefined();
				expect(run.distance).toBeGreaterThan(0);
				expect(run.duration).toBeDefined();
				expect(run.pace).toBeDefined();
				expect(run.kcal).toBeDefined();
				expect(run.elevation).toBeDefined();
				expect(run.cadence).toBeDefined();
				expect(run.steps).toBeDefined();
				expect(run.location).toBeDefined();
				expect(run.steps).toBeDefined();
				expect(run.source).toBeDefined();
				expect(run.notes).toBeDefined();
				done();
			});
		});
	});
});
