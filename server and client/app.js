//app setup
console.log('App setup');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var exphbs  = require('express-handlebars');
var app = express();

// Handlebars setup
console.log('Handlebars setup');
var hbs =  exphbs.create({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: 'views/common/'
});
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mysql database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'admin',
  database : 'weather'
});
connection.connect(function(err){
if(!err) {
    console.log("Mysql Database is connected ... ");    
} else {
    console.log("Error connecting database ... ");    
}
});

//Routing 
app.get('/', function(req,res){
	res.render('home')
});
app.get('/query', function(req,res){
    res.render('query')
});
app.get('/about', function(req,res){
    res.render('about')
});
app.get('/schema', function(req,res){
    res.render('tableschema')
});
app.get('/data', function(req,res){
    res.render('data')
});
app.get('/visual', function(req,res){
    res.render('visual')
});


// Boot server
console.log('Boot server');
var server = app.listen(3000, function(){
    console.log('Server running at port 3000');
});