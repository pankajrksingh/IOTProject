var express = require('express'),
	db = require('./dbhelper');

var api = express.Router();



api.get('/data',function(req,res){


	db.getData(function(err,response){

		if(err){
			res.json({message : err});
		}else{
			res.status(200).json({status:200,message : response});		
		}
	});
});

module.exports = (function(){
	'use strict';
	return api;
})();