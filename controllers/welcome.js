var User = require('../models/user');

module.exports = {
  welcome: welcome,
};

function welcome(req, res, next) {
  res.render('welcome.ejs', { title: 'home_Me', user: req.user });
};
