var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index,
  addFaves: addFaves
}

function index(req, res, next) {
  res.render('mylistings.ejs', { title: 'home_Me', user: req.user });
}

function addFaves(req, res, next) {
  //pushes listings id from params into user favorites array
  req.user.favorites.push(req.params.id);
  req.user.save();
  User.find({'_id': req.user._id})
  //replaces id with full representation of object
    .populate('favorites')
  //actually execute query, .populate does not run until .exec
    .exec(function(err, user) {
      if(err) throw err;

      res.json(user);
    });
}
