var express = require('express');
var passport = require('passport');
var router = express.Router();
var Listing = require('../models/listing');
// require controllers
var welcomeController = require('../controllers/welcome');
var listingsController = require('../controllers/listings');
var messagesController = require('../controllers/messages');
var mylistingsController = require('../controllers/mylistings');
var postedlistingsController = require('../controllers/postedlistings');
var groupchatsController = require('../controllers/groupchats');
var api_listingsController = require('../controllers/api_listings');

function authenticatedUser(req, res, next) {
  // if user authenticated, continue to next execution
  if(req.isAuthenticated()) return next();
  // otherwise always redirect to root route
  res.redirect('/');
}

router.route('/api/listings')
  .get(authenticatedUser, api_listingsController.index)
  .post(authenticatedUser, api_listingsController.create)
  .delete(authenticatedUser, api_listingsController.destroy)
  .put(authenticatedUser, api_listingsController.edit)
/* GET root path. */
router.route('/')
  .get(welcomeController.welcome)
// first page upon logging in
router.route('/listings')
  .get(authenticatedUser, listingsController.index)
// route to post a new listing
router.route('/listings/new')
  .get(authenticatedUser, listingsController.newListing)
//route to favorited listings
router.route('/listings/favorites')
  .get(authenticatedUser, mylistingsController.index)
//route to posted listings
router.route('/listings/postedlistings')
  .get(authenticatedUser, postedlistingsController.index)
// posts listings to favorited listings array
router.route('/listings/favorites/:id')
  .post(mylistingsController.addFaves)
// route to listings/id
router.route('/listings/:id')
  .get(authenticatedUser, listingsController.show)
// route to create a groupchat
router.route('/groupchats')
  .get(authenticatedUser, groupchatsController.home)
// route to speicfic groupchat
router.route('/groupchats/:id')
  .get(authenticatedUser, groupchatsController.show)
// api for groupchats
router.route('/api/groupchats')
  .get(authenticatedUser, groupchatsController.index)
  .post(groupchatsController.create)
router.route('/api/groupchats/:id')
  .get(authenticatedUser, groupchatsController.checkPass)
  .post(messagesController.create)
router.route('/api/groupchats/:id/messages')
  .get(authenticatedUser, messagesController.index)
// google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/listings',
    failureRedirect: '/'
  }
));
// OAuth logout router
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
