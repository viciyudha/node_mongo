const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
});

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
// //jwt.verify
//
// // var message = 'I am user number 3';
// // var hash = SHA256(message).toString();
// //
// // console.log('Message: ', message);
// // console.log('Hash: ', hash);
// //
// //
// // var data = {
// //   id: 4
// // }
// //
// // var token = {
// //   data: data,
// //   hash: SHA256(JSON.stringify(data) + 'Xsecretcode').toString()
// // }
// //
// // var resultHash = SHA256(JSON.stringify(token.data) + 'secretcode').toString();
// //
// // if (token.hash === resultHash) {
// //   console.log('Data correct');
// // } else {
// //   console.log('Data incorrect');
// // }
