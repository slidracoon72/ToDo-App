let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//connect to Atlas database
mongoose.connect('mongodb+srv://root:root@todo-an0ru.mongodb.net/test?retryWrites=true&w=majority', function (err) {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

//create a schema - a blueprint
let todoSchema = new mongoose.Schema({
    item: String
});

// create a collection
let Todo = mongoose.model('Todo', todoSchema);


// let itemOne = Todo({item:'buy house'}).save(function (err) {
//     if (err) throw err;
//     console.log("item saved");
// });

// let data = [{item: "water garden"}, {item: "clean room"}, {item: "make painting"}];

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {


    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });

    });


    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from input and add to mongodb
        let newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });


    app.delete('/todo/:item', function (req, res) {
        //delete requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
        //
        // data = data.filter(function (todo) {
        //     // if false, gets deleted
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
};