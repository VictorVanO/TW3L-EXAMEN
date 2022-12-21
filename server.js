// Start server with express
let express = require('express');
let app = express(); // Instancier le serveur
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// Database connection
var mysql = require("mysql");
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'voyages'
});
connection.connect(function(error) {if (error) console.log(error);});


let session = require("express-session");
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
    })
);

// Set route
// Méthode HTTP 'get' dont on déclare le chemin et 2 paramètres
app.get('/', (req, res) => {
    connection.query("select * from voyage;", function(error, result) {
        if(error) console.log(error);
        res.render('home.ejs');
    });
}); 

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/cookie', function(req, res){
    res.cookie("cookie_name", "my_cookie_value").send("Cookie is set ");
    });
    app.use(cookieParser());

let routes = require('./routes');
app.use('/', routes);

var port = process.env.PORT || 8000;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Runnings on port " + port);
});