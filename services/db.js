var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 5,
  host            : 'localhost',
  user            : 'petr',
  password        : 'AliKoko2015',
  database        : 'runstats'
});

module.exports = pool;
