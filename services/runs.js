var pool = require('./db');

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
 * @apiDefine GameDTOGet
 * @apiSuccess (Run DTO) {String} year Year of the date of the run: yyyy.
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
	
	const columns = "id, DATE_FORMAT(date, '%Y/%m/%d') AS date, YEAR(date) as year, time, distance, " + 
		"duration, pace, kcal, elevation, cadence, steps, location, source, notes ";
	
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
		pool.query('SELECT *, YEAR(date) as year ' + 
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

/** 
 * api {post} /games 3. Create a new game
 * apiVersion 1.0.0
 * apiName createGame
 * apiGroup Games
 *
 * apiSuccess (Request) {JSON} body A <code>Game DTO</code> object.
 * apiUse GameDTO
 */
/*
module.exports.createGame = function(callback, game) {
	
	if (game) {
		var forfeit = game.forfeit ? game.forfeit : 0;	
		
		pool.query("INSERT INTO game (date, competition, team_a, team_b, full_a, full_b, round, forfeit) " + 
					"VALUES (CURDATE(), ?, ?, ?, ?, ?, ?, ?)", 
					[game.competition, game.team_a, game.team_b, game.full_a, game.full_b, game.round, forfeit], 
		
		function(err, result) {
			if (err) {
			  	console.error('error connecting: ' + err.stack);
			  	throw err;
		  	}
		  	callback(result);
			console.log('[createGame] Insert ID: ' + result.insertId)
		});
		
	} else {
		var errorMessage = 'getGame: Mandatory `new game` body missing'
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
}
*/