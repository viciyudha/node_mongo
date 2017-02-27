const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove
// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
// Todo.findOneAndRemove().then((result) => {
//
// })

Todo.findByIdAndRemove('58b438bb00dab58b1727b107').then((todo) => {
  console.log(todo);
});
