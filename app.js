require('./config/config');
require('./models/db'); 
require('./config/passportConfig');
require('./config/jwt_helper');

// consta
const path = require('path');
const passport = require('passport');
var exphbs  = require('express-handlebars');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeController = require('./routes/register_route');


var app = express();

//  static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// middleware
app.use(bodyParser.urlencoded(({extended: false})));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());



app.use('/api', routeController);
app.get('/',(req, res) => {
    res.render('index');
})


// error handler
app.use((err, req, res, next) =>{
    if(err.name == 'ValidationError'){
        var valError = [];
        Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
        res.status(422).send(valError);
    }
})
const port = process.env.PORT || 7500;

// start server
app.listen(port, ()=> console.log(`server started at port: ${port}`))