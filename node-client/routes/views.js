var express = require('express'),
	constants = require('../helper/constants');

var view = express.Router();


view.get('/',function(req,res){
	res.render('index');
});


view.get('/home',ensureAuthenticated,function(req,res){
	res.render('home',{
		user : req.user
	});
});

view.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {

	console.log("in ensureAuthenticated");
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = (function(){
	return view;
})();