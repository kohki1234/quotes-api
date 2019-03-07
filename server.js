var express = require("express");

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database("quotes.db")

var bodyParser = require("body-parser");
var app = express();
var port = 3000;

var quotes = [
    {
        id: 1,
        quote: "The best is yet to come",
        author: "Unknown",
        year : 2000
    },
    {
        id: 2,
        quote: "This is a quote",
        author: "First Last",
        year : 1930
    },
    {
        id: 3,
        quote: "This is another quote",
        author: "First2 Last2",
        year : 1910
    },
];



app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, function(){
    console.log("App is listening to port 3000")
})

app.get('/', function(request, response){
    response.send("Get request received at '/'")
})

app.get('/quotes', function(req, res){
    if(req.query.year){
        db.all('SELECT * FROM quotes WHERE year=?', [parseInt(req.query.year)], function(err, rows){
            if(err){
                res.send(err.message);
            }
            else{
                console.log("Return a list of quotes from the year: " + req.query.year);
                res.json(rows);
            }
        });
    }
    else{
        db.all('SELECT * FROM quotes', function processRows(err, rows){
            if(err){
                res.send(err.message);
            }
            else{
                for( var i = 0; i < rows.length; i++){
                    console.log(rows[i].quote);
                }
                res.json(rows);
            }
        });
    }
});

app.get('/quotes/:id', function(req, res){
    console.log("return quote with the ID: " + req.params.id);
    db.get('SELECT * FROM quotes WHERE rowid = ?', [req.params.id], function(err, row){
        if(err){
            console.log(err.message);
        }
        else{
            res.json(row);
        }
    });
});


app.post('/quotes', function(req, res){

    db.run('INSERT INTO Quotes VALUES (?, ?, ?)', [req.body.quote, req.body.author, req.body.year]);
    //req.body.quote, req.body.author, req.body.year
    console.log("Insert a new quote : " + req.body.quote);
    res.json(req.body);
})
