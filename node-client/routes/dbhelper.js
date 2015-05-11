var config = require('../helper/config');


var cloudant = require('cloudant')(config.db_config);

var db = cloudant.use(config.db_name);


exports.getData = function(callback){
	

	db.list({include_docs : true,descending : true,limit : 10},function(err,body){
		if(err){
			callback(err);
		}
		else{
			callback(null,body.rows);
		}
	});

};