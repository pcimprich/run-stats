var express = require('express');
var router = express.Router();

var model = require('../../services/runs.js');

/* GET all runs or all runs for a year*/
router.get('/', function(req, res, next) {
	
	model.getRuns(function(rows){
		res.send(rows);	
	}, req.query.year);
});

/* GET a run with given ID */
router.get('/:id', function(req, res, next) {
	
	model.getRun(function(rows){
		res.send(rows);	
	}, req.params.id);
});

/* POST a new run */
/* tbd
router.post('/', function(req, res, next) {
	
	model.createRun(function(result){
		res.redirect('/');
	}, req.body);
});
*/

module.exports = router;
