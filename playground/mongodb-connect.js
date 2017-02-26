//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  // 	text: 'Something todo',
  // 	completed: false
  // }, function (err, result) {
  // 	if (err) {
  // 		return console.log('Unable to insert todo', err);
  // 	}

  // 	console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('User').insertOne({
  // 	name: 'Arya Viciyudha',
  // 	age: 24,
  // 	location: 'Jakarta'
  // }, function(err, result) {  	
  // 	if (err) {
  // 		return console.log(err);
  // 	}
  // 	console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
