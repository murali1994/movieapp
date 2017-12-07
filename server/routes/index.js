var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
//let signupControl = require('../controller/signupcontrol');
//let loginControl = require('../controller/logincontrol');
let movieSearch = require('../controller/moviecontrol');


/*route for signup*/
//router.get('/signup', signupControl.addNewUser);
/*route for logging in*/
//router.get('/login', loginControl.login);
//router.get('/logout', loginControl.logout);
/*routes for movies add,delete,search,view*/
/*router.get('/movie/search', movieSearch.search);
router.get('/movie/add', movieSearch.favourite);
router.get('/movie/view', movieSearch.viewfavourite);
router.get('/movie/delete', movieSearch.delfavourite);*/

module.exports = router;

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	router.get('/movie/search', movieSearch.search);
    router.get('/movie/add', movieSearch.favourite);
    router.get('/movie/view', movieSearch.viewfavourite);
    router.get('/movie/delete', movieSearch.delfavourite);

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/',
		failureFlash : true
	}));

	

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/movie.html',
		failureRedirect: '/',
		failureFlash : true
	}));

	

	/* Handle Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	
	return router;
}