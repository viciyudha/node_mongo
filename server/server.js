var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

const PORT = process.env.PORT || 3000;

var app = express();


app.use(bodyParser.json());

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

    res.send(todo);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(PORT, () => {
  console.log('Started on port ', PORT);
});

module.exports = {app};
