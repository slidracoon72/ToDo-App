let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

//set up template engine
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

app.listen(3000);
console.log("Listening to port 3000");