var express = require('express');
var router = express.Router();

var model = require('../../services/stats.js');

/* GET all runs or all runs for a year*/
router.get('/total', function(req, res, next) {
	
	model.getTotal(function(rows){
		res.send(rows);	
	});
});

module.exports = router;
