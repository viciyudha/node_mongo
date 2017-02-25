//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('User').find({name: 'Arya'}).toArray().then((user) => {
  	console.log(JSON.stringify(user, undefined, 2));
  }, (e) => {
  	console.log(e);
  });

  // db.collection('Todos').find().count()
  // 	.then((count) => {
  // 		console.log('Todos count: ' + count);
  // 	}, (e) => {
  // 		console.log(e);
  // 	});

  // db.collection('Todos').find({
  // 	_id: new ObjectID('58b1187e81f712fc835d2fc7')
  // }).toArray().then((docs) => {
  // 	console.log('Todos');
  // 	console.log(JSON.stringify(docs, undefined, 5));
  // }, (err) => {
  // 	console.log('Unable to fetch todos', err);
  // });

  //db.close();
});
