var Groupchat = require('../models/groupchat');

module.exports = {
  home: home,
  show: show,
  index: index,
  create: create,
  checkPass: checkPass
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

function checkPass(req, res, next) {
  // this function grabs the groupchat json object which contains the chatPassword. json object is sent to the frontend thru a get req and over there a function checks for password match
  var id = req.params.id;
  console.log(id);
  console.log(req.url);
  Groupchat.findById(id, function(err, groupchat) {
    if (err) throw err;

    console.log(groupchat.chatPassword);
    res.json(groupchat)
  });
}
