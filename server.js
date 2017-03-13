var express=require('express');
var app=express()
var bodyParser=require("body-parser");
var router=express.Router();
var player = require('./model/mongo.js').player;
var user = require('./model/mongo.js').user;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

//connect to local mongodb database
//var conn = player.connect('mongodb://127.0.0.1:27017/test');

//mongoose.connection.once('connected', function() {
//	console.log("Connected to database")
//});

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});    
});

router.route("/players").get(function(req,res){
	var response = {};
        player.find({},function(err, data) {
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"message" : data};
            }
            res.json(response);     
      });
});

router.route("/player/id/:id").get(function(req,res){

	var response = {};
	player.find({"id":req.params.id},function(err, data) {
        if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            }
	else {
               response = {"message" : data};
            }

        res.json(response);     
      });
    });


router.route("/player/country/:country").get(function(req,res){

	var response = {};
        player.find({"country":req.params.country},function(err, data) {
        if(err) {
              response = {"error" : true,"message" : "Error fetching data"};
            } 
	else {
              response = {"message" : data};
            }
        res.json(response);     
      });
    });



router.route("/player/team/:team").get(function(req,res){

	var response = {};
        player.find({"team":req.params.team},function(err, data) {
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"message" : data};
            }
            res.json(response);     
      });
    });


router.route("/addplayer").post(function(req,res){
        var db=new player();
        var response={};
	db.name=req.body.name;
	db.id=req.body.id;
	db.team=req.body.team;	
	db.country=req.body.country;
	db.save(function(err){

	if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
	});
});

router.route("/signup").post(function(req,res){

 	console.log(req.body.name);
	var response={};
        var usr=new user({
	//usr.name:req.body.name,
	//usr.email:req.body.email,
	//usr.password:req.body.password


         name:req.body.name,
	email:req.body.email,
	password:req.body.password

        });
	console.log(usr.name);
	usr.save(function(err){
	if(err) {
        	response = {"error" : true,"message" : "Error adding data"};
         } 
	else {
	        response = {"error" : false,"message" : "Data added"};
            }

        res.json(response);
         });
	
});


router.route("/login").post(function(req,res){

 	
	var response={};
        
	//usr.name:req.body.name,
	//usr.email:req.body.email,
	//usr.password:req.body.password

	var email=req.body.email;
	var password=req.body.password;


      
	
	user.find({"email":email,"password":password},function(err){
	if(err) {
        	response = {"error" : true,"message" : "Invalid Login details"};
         } 
	else {
	        response = {"message" :"success","message" : "Logged in successfully"};
            }

        res.json(response);
         });
	
});


app.use('/',router);
app.listen(5000);
console.log("Listening to PORT 5000");



