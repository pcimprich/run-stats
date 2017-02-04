var pool = require('./db');

/**
 * @apiDefine TotalDTO
 * @apiSuccess (Total DTO) {Number} count Total count of all runs.
 * @apiSuccess (Total DTO) {Number} distance Total distance [km] of all runs run.
 * @apiSuccess (Total DTO) {String} duration Total duration [s] of all runs.
 * @apiSuccess (Total DTO) {Number} elevation Total elevation [m] gained during all runs.
 */

/** 
 * @api {get} /stats/total 1. Get overall statistics
 * @apiVersion 1.0.0
 * @apiName getTotal
 * @apiGroup Statistics
 *
 * @apiSuccess (Response) {JSON} runs A <code>Total DTO</code> objects.
 * @apiUse TotalDTO
 */
module.exports.getTotal = function(callback) {
	
	pool.query('SELECT count(*) AS count, ROUND(SUM(distance)) AS distance, SUM(duration) AS duration, ' + 
					'SUM(elevation) AS elevation FROM run',
				function(err, rows) {
					if (err) {
			  		  console.error('error connecting: ' + err.stack);
			  		throw err;
		  	  		}
		  			callback(rows[0]);
				});
}
