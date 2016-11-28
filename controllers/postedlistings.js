var Listing = require('../models/listing');
var User = require('../models/user');

module.exports = {
  index: index
}

function index(req, res, next) {
    Listing.find({"createdBy": req.user._id}, function(err, listings) {
      console.log(listings, 'err -> ', err);
      if (err) throw err;
      res.render('postedlistings.ejs', {title: 'home_Me', user: req.user, listings: listings });
    })
};
