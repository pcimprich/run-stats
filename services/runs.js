var pool = require('./db');

const columns = "id, DATE_FORMAT(date, '%Y/%m/%d') AS date, YEAR(date) as year, MONTH(date) as month, " +
	"WEEK(date,3) as week, time, distance, duration, pace, kcal, elevation, cadence, steps, location, source, notes ";

/**
 * @apiDefine RunDTO
 * @apiSuccess (Run DTO) {String} id ID of the run.
 * @apiSuccess (Run DTO) {String} date Date of the run: yyyy-mm-dd.
 * @apiSuccess (Run DTO) {String} [time] Time of the run: hh:mm:ss.sssZ.
 * @apiSuccess (Run DTO) {Number} distance Total distance [km] of the run.
 * @apiSuccess (Run DTO) {String} duration Total duration of the run: hh:mm:ss.
 * @apiSuccess (Run DTO) {String} pace Average pace per 1 km of the run: hh:mm:ss.
 * @apiSuccess (Run DTO) {Number} kcal Total energy [kcal] consumed for the run.
 * @apiSuccess (Run DTO) {Number} elevation Total elevation [m] gained during the run.
 * @apiSuccess (Run DTO) {Number} [cadence] Average cadence [steps/min] of the run.
 * @apiSuccess (Run DTO) {Number} [steps] Total number of steps of the run.
 * @apiSuccess (Run DTO) {String} [location] Location of the run.
 * @apiSuccess (Run DTO) {String} source Source of data: (Runtastic|Garmin|Manual).
 * @apiSuccess (Run DTO) {String} [notes] Additional short notes, limited to 256 characters.
 */

/**
 * @apiDefine RunDTOGet
 * @apiSuccess (Run DTO) {String} year Year of the date of the run: yyyy.
 * @apiSuccess (Run DTO) {String} month Month number of the date of the run: 1-12.
 * @apiSuccess (Run DTO) {String} week Week number of the date of the run: 1-53.
 */

/** 
 * @api {get} /runs 1. Get all runs
 * @apiVersion 1.0.0
 * @apiName getRuns
 * @apiGroup Runs
 *
 * @apiParam {Number} [year] Returns only runs for the year.
 *
 * @apiSuccess (Response) {Array} runs[] Array of <code>Run DTO</code> objects.
 * @apiUse RunDTO
 * @apiUse RunDTOGet
 */
module.exports.getRuns = function(callback, year) {
	
	// all games for a competition
	if (year) {
		pool.query('SELECT ' + columns + 
					'FROM run ' + 
					'WHERE YEAR(date) = ? ' +
					'ORDER BY date DESC',
					[year], function(err, rows) {
			if (err) {
			  	console.error('error connecting: ' + err.stack);
			  	throw err;
		  	}
		  	callback(rows);
		});
		
	// all games
	} else {
		pool.query('SELECT ' + columns + 
					'FROM run ' + 
					'ORDER BY date DESC', 
					function(err, rows) {
			if (err) {
				console.error('error connecting: ' + err.stack);
			  	throw err;
		  	}
		  	callback(rows);
		});
	}
}

/** 
 * @api {get} /runs/:id 2. Get a specific run
 * @apiVersion 1.0.0
 * @apiName getRun
 * @apiGroup Runs
 *
 * @apiParam {Number} :id ID of the run.
 *
 * @apiSuccess (Response) {JSON} run A <code>Run DTO</code> object.
 * @apiUse RunDTO
 * @apiUse RunDTOGet
 */
module.exports.getRun = function(callback, id) {
	
	if (id) {
		pool.query('SELECT ' + columns + 
					'FROM run ' + 
					'WHERE id = ?', 
					[id], function(err, rows) {
			if (err) {
			  	console.error('error connecting: ' + err.stack);
			  	throw err;
		  	}
		  	callback(rows[0]);
		});
		
	} else {
		var errorMessage = 'getGame: Mandatory `id` parameter missing'
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
}
