//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Complete product log'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  db.collection('Todos').deleteOne({text: 'Complete product log'}).then((result) => {
    console.log(result);
  });


  // findOneAndDelete

  //db.close();
});
