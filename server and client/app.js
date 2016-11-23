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
  user     : 'root',
  password : '',
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
app.get('/about', function(req,res){
    res.render('about')
});
app.get('/schema', function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('desc city', function(err, rows1, fields1) {
                if (!err){
                    res.render('tableschema', {val:rows1, tab:rows, name:'City'});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/schema',function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('desc '+req.body.tables, function(err, rows1, fields1) {
                if (!err){
                    res.render('tableschema', {val:rows1, tab:rows,name:req.body.tables});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.get('/data', function(req,res){
    res.redirect('/city');
});
app.get('/city', function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('select * from city', function(err, rows1, fields1) {
                if (!err){
                    res.render('city', {rows: rows1, fields:fields1, tab:rows, name:'City'});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/city', function(req,res){
    if(req.body.tables=='city') {
        res.redirect('city');
    }
    else if(req.body.tables=='weather_type'){
        res.redirect('weather_type');}
    else if(req.body.tables=='observation')
        res.redirect('observation');
    else if(req.body.tables=='temperature')
        res.redirect('temperature');
    else if(req.body.tables=='wind')
        res.redirect('wind');
});
app.get('/weather_type', function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('select wid as WeatherId, wtype as WeatherType from weather_type', function(err, rows1, fields1) {
                if (!err){
                    res.render('wtype', {rows: rows1, fields:fields1, name:'Weather_type', tab:rows});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/weather_type', function(req,res){
    if(req.body.tables=='city')
        res.redirect('/city');
    else if(req.body.tables=='weather_type')
        res.redirect('/weather_type');
    else if(req.body.tables=='observation')
        res.redirect('/observation');
    else if(req.body.tables=='temperature')
        res.redirect('/temperature');
    else if(req.body.tables=='wind')
        res.redirect('/wind');
});
app.get('/observation', function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('select * from observation', function(err, rows1, fields1) {
                if (!err){
                    res.render('observation', {rows: rows1, fields:fields1, name:'Observation', tab:rows});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/observation', function(req,res){
    if(req.body.tables=='city')
        res.redirect('/city');
    else if(req.body.tables=='weather_type')
        res.redirect('/weather_type');
    else if(req.body.tables=='observation')
        res.redirect('/observation');
    else if(req.body.tables=='temperature')
        res.redirect('/temperature');
    else if(req.body.tables=='wind')
        res.redirect('/wind');
});
app.get('/temperature', function(req,res){
    connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('select oid as ObservationId, val_k as Kelvin, val_c as Celcius from temperature', function(err, rows1, fields1) {
                if (!err){
                    res.render('temperature', {rows: rows1, fields:fields1, name:'Temperature', tab:rows});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/temperature', function(req,res){
    if(req.body.tables=='city')
        res.redirect('/city');
    else if(req.body.tables=='weather_type')
        res.redirect('/weather_type');
    else if(req.body.tables=='observation')
        res.redirect('/observation');
    else if(req.body.tables=='temperature')
        res.redirect('/temperature');
    else if(req.body.tables=='wind')
        res.redirect('/wind');
});
app.get('/wind', function(req,res){
        connection.query('show tables', function(err, rows, fields) {
        if (!err){
            connection.query('select * from wind', function(err, rows1, fields1) {
                if (!err){
                    res.render('wind', {rows: rows1, fields:fields1, name:'Wind', tab:rows});
                }
                else
                    console.log('Error while performing Query.');
            });
        }
        else
            console.log('Error while performing Query.');
    });
});
app.post('/wind', function(req,res){
    if(req.body.tables=='city')
        res.redirect('/city');
    else if(req.body.tables=='weather_type')
        res.redirect('/weather_type');
    else if(req.body.tables=='observation')
        res.redirect('/observation');
    else if(req.body.tables=='temperature')
        res.redirect('/temperature');
    else if(req.body.tables=='wind')
        res.redirect('/wind');
});

app.get('/query', function(req,res){
    res.render('query')
});
app.post('/query', function(req,res){
    query=req.body.data;
    connection.query(query, function(err, rows1, fields1) {
        if (!err){
            res.render('query', {fields:fields1, rows:rows1});
        }
        else
            res.render('query',{err: 'Error while performing Query'});
    });


});
app.get('/visual', function(req,res){
    sql="select t.val_c,o.recordtime from city c,temperature t,observation o where " +
        "c.cityid=o.id and o.oid=t.oid and c.cityname='Delhi'";
    connection.query('select * from city', function(err, rows, fields) {
        connection.query(sql, function (err, rows1, fields1) {
            if (!err) {
                var arr = [];
                var x = 1;
                for (i in rows1) {

                    var obj = {"x": x, "y": rows1[i].val_c};
                    x = x + 1;
                    arr.push(obj);
                }
                res.render('visual', {val: arr, tab:rows});
            }
        });
    });
});
app.post('/visual', function(req,res){
    sql="select t.val_c,o.recordtime from city c,temperature t,observation o where " +
        "c.cityid=o.id and o.oid=t.oid and c.cityname='"+req.body.tables+"'";
    connection.query('select * from city', function(err, rows, fields) {
        connection.query(sql, function (err, rows1, fields1) {
            if (!err) {
                var arr = [];
                var x = 1;
                for (i in rows1) {

                    var obj = {"x": x, "y": rows1[i].val_c};
                    x = x + 1;
                    arr.push(obj);
                }
                res.render('visual', {val: arr, tab:rows, name:req.body.tables});
            }
        });
    });
});

// Boot server
console.log('Boot server');
var server = app.listen(3000, function(){
    console.log('Server running at port 3000');
});