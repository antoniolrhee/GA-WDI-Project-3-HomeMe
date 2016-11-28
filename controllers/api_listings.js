var Listing = require('../models/listing');
var User = require('../models/user');
var NodeGeocoder = require('node-geocoder');

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  edit: edit
}

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

function index(req, res, next) {
  if (req.query.id) {
    Listing.findOne({'_id': req.query.id}, function(err, listing) {
      if (err) res.send(err);
      res.json(listing);
    });
  } else {
    Listing.find({}, function(err, listings) {
      if (err) res.send(err);
      res.json(listings);
    });
  }
};

function create(req, res, next) {
  var newListing = {
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    zipcode: req.body.zipcode,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    duration: req.body.duration,
    pets: req.body.pets,
    furnished: req.body.furnished,
    imageurl: req.body.imageurl,
    createdBy: req.user._id
  }
  geocoder.geocode(newListing.address + ", " + newListing.city + ", " + newListing.state + " " + newListing.zipcode)
  .then(function(data) {
    var firstListing = data[0];
    newListing.formattedAddress = firstListing.formattedAddress;
    newListing.latitude = firstListing.latitude;
    newListing.longitude = firstListing.longitude;
    newListing.googlePlaceId = firstListing.extra.googlePlaceId;
    newListing.neighborhood = firstListing.extra.neighborhood;
    newListing.streetNumber = firstListing.streetNumber;
    newListing.streetName = firstListing.streetName;
    newListing.city = firstListing.city;
    newListing.country = firstListing.country;
    newListing.countryCode = firstListing.countryCode;
    newListing.zipcode = firstListing.zipcode;
    newListing.provider = firstListing.provider;
    console.log(newListing);
    Listing.create(newListing, function(err, listing) {
      if (err) res.send(err);
      res.json(listing);
    })
  })
};

function destroy(req, res, next) {
  var id = { "_id": req.body.id }
  console.log(req.user._id);
  Listing.findOne(id, function(err, listing) {
    console.log(listing);
    if (err) throw err
    else if (req.user._id.toString() == listing.createdBy) {
      listing.remove(function(err) {
        if (err) console.log('delete failed -> ', err);
        res.send(204);
      })
    } else {
      res.send(401);
    }
  })
};

function edit(req, res, next) {
  var id = { "_id": req.body.id }
  Listing.findOne(id, function(err, listing) {
    if (err) throw err
    else if (req.user._id.toString() == listing.createdBy) {
      Listing.findOneAndUpdate({_id: req.body.id}, req.body, function(err) {
        if (err) console.log('update failed -> ', err);
        res.send(204);
      })
    } else {
      res.send(401);
    }
  })
};
