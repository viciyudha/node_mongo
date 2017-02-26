var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlentgh: 1,
  }
});

module.exports = {User};

// var user = new User({
//   email: 'arya.rezavidi@gmail.com'
// });
//
// user.save().then((doc) => {
//   console.log(doc);
// }, (e) => {
//   console.log(e);
// });
