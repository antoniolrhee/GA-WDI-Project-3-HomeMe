var Groupchat = require('../models/groupchat');

module.exports = {
  home: home,
  show: show,
  index: index,
  create: create,
}

function home(req, res, next) {
  res.render('groupchats/index.ejs', { title: 'home_Me', user: req.user });
}

function show(req, res, next) {
  res.render('groupchats/show.ejs', { title: 'home_Me', user: req.user });
}

function index(req, res, next) {
  Groupchat.find({}, function(err, groupchats) {
    if (err) next(err);

    res.json(groupchats);
  });
}

function create(req, res, next) {
  var newGroupchat = new Groupchat(req.body);
  newGroupchat.save(function(err, savedGroupchat) {
    if (err) next(err);

    res.json(savedGroupchat);
  });
}
