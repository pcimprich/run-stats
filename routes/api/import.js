var express = require('express');
var router = express.Router();

var model = require('../../services/import.js');

/* GET and insert new runs from Activities.csv */
router.get('/', function(req, res, next) {
	
	model.importGarmin(function(count){
		res.send(count);	
	}, req.query.test);
});

module.exports = router;
