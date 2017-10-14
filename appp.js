var express = require('express');
var app = express();



var hbs = require('hbs');

app.set('view engine', 'html');
app.engine('html', hbs.__express);



//app.use(express.static('public'));


var Datastore = require('nedb');  
var users = new Datastore({ filename: 'db/user.db', autoload: true });  
users.loadDatabase();
/*
var Datastore = require('nedb')
    , db = new Datastore({ filename: 'path/to/datafile', autoload: true });
var db = {};
db.users = new Datastore('path/to/users.db');
db.robots = new Datastore('path/to/robots.db');   

// You need to load each database (here we do it asynchronously) 
db.users.loadDatabase();
db.robots.loadDatabase();

var doc = { first_name: 'world'
            , last_name: 'kkkkk'
          };

users.insert(doc, function (err, newDoc) {   // Callback is optional 
// newDoc is the newly inserted document, including its _id 
// newDoc has no key called notToBeSaved since its value was undefined 
});
*/   
/*
var Datastore = require('nedb')
, path = require('path')
, db = new Datastore({ filename: path.join(require('nw.gui').App.dataPath, 'something.db') });
*/

app.get('/', function (req, res) {
    //var 
    var entry;
    users.find({}, function (err, docs) {
        console.log("wewe",err,docs);
        entry = docs;
        res.render('index',{data:docs});
    });
    console.log("ohohohoh",entry);
    //var entry = db.users.find({},);
    //console.log("hello",entry);
    //console.log("hell",db.users);
    
    //var entry = blogEngine.getBlogEntry(req.params.id);
    /*var entr = [
        {
            name: "kkk",
            sex: "M"
        },{
            name: "lll",
            sex: "F"
        }
    ]
    res.render('index',{data:entr[0]});
    */

   //res.sendFile( __dirname + "/" + "index.htm" );
})


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   users.insert(response, function (err, newDoc) {   // Callback is optional 
        // newDoc is the newly inserted document, including its _id 
        // newDoc has no key called notToBeSaved since its value was undefined 
    });
  
   //console.log(response);
   //console.log();
   res.end(JSON.stringify(response));
})









app.get('/index.html', function (req, res) {
    var blogEngine = db.find({}, function (err, docs) {
    });
    
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});

   //res.sendFile( __dirname + "/" + "index.htm" );
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})















/*
var express = require('express');
var app = express();

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
*/