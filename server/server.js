require('./config/config');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

const PORT = process.env.PORT;

var app = express();


app.use(bodyParser.json());

// POST User
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    console.log(token);
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// GET User/me
app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

// GET Todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos: todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET Todos by ID
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo: todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// POST Todos
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

// DELETE Todos
app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
        return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.listen(PORT, () => {
  console.log('Started on port ', PORT);
});

module.exports = {app};
