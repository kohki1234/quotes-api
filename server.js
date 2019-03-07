var express = require("express");

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database("quotes.db")

var bodyParser = require("body-parser");
var app = express();
var port = process.env.port || 1337;

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(process.env.PORT || port, function(){
    console.log("App is listening to port " + port);
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


app.delete('/quotes/:id/delete', function (req, res) {
    db.run('DELETE FROM quotes WHERE rowid = ?', [req.params.id], function(err, row) {
        if(err) {
            console.log(err);
        } else {
            console.log(`Row(s) deleted ${this.changes}`);
            res.send("ID :" + req.params.id + " is deleted");
        }
    });
})