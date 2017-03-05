var express=require('express');
var app=express()
var bodyParser=require("body-parser");
var router=express.Router();
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


//connect to local mongodb database
var conn = mongoose.connect('mongodb://127.0.0.1:27017/test');


mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});



router.route("/players").get(function(req,res){

var response = {};
//var collection=conn.db.get("players");
        
conn.on('open', function () {
       conn.db.get("players").findOne({"name":"Messi"},function(err, data) {
                   if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
                 
        });   
      });
    });

app.use('/',router);

app.listen(5000);
console.log("Listening to PORT 3000");
