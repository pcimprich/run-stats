var express = require('express');
var router = express.Router();

/* GET empy index page for React */
router.get('/', function(req, res, next) {
	
	res.render('index', 
		{ title: "run-stats" }
	);	
});

module.exports = router;
