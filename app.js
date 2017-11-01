//========================== Requiring
var express = require('express'),
      app = express(),
      hbs = require('hbs'),
      Datastore = require('nedb'),
      fs = require('fs-extra'),
      path = require('path'),
      multer = require('multer'),
      unzip = require('unzip'),
      fileUpload = require('express-fileupload'),
      decompress = require('decompress'),
      fss = require('fs-extra'),
      extract = require('extract-zip');


//========================== scripts and styles
let scripts =  {
  "materialize" : "libs/js/materialize.min.js",
  "jquery" : "libs/js/plugins/jquery-1.11.2.min.js",
  "countdown" : "libs/js/plugins/jquery.countdown-2.1.0/jquery.countdown.js",
  "sweetalert" : "libs/js/plugins/sweetalert/sweetalert.min.js",
  "perfectscroll" : "libs/js/plugins/perfect-scrollbar/perfect-scrollbar.min.js",
  "custom": "libs/js/script.js"
}
let styles =  {
  "materialize" : "libs/css/materialize.css",
  "perfectscroll" : "libs/js/plugins/perfect-scrollbar/perfect-scrollbar.css",
  "sweetalert" : "libs/js/plugins/sweetalert/sweetalert.css",
  "dropify" : "libs/js/plugins/dropify/dropify.css",
  "fontawesome" : "libs/font-awesome/css/font-awesome.min.css",
  "custom" : "libs/css/style.css"
}
let enqueue_script = function(type,data){
  let ans  = [];
  if(data==undefined){
    if(type=="style")
      data  = Array("fontawesome","materialize","perfectscroll","custom");
    else if(type=="script")
      data  = Array("jquery","materialize","perfectscroll","custom");
  }
  for(let l=0;l<data.length;l++){
    if(type=="style")
      ans.push(styles[data[l]]);
    else if(type=="script")
      ans.push(scripts[data[l]]);
  }
return ans;
}
let script = enqueue_script("script");
let style = enqueue_script("style");
let statics = { "script" : script, "style" : style }



//==========================
app.use(fileUpload());
app.locals.title = 'AskuaLabs';
//treat html files as hbs files
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.static('public'));

//partials
hbs.registerPartials(__dirname + '/views/partials' );
//hbs helpers
hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});


//========================== Databases
//connection to the users collection
var users = new Datastore({ filename: 'db/user.db', autoload: true });
//connection to the simulations collection
var simulation = new Datastore({ filename: 'db/simulation.db', autoload: true });
simulation.loadDatabase();
users.loadDatabase();
//connection to the subjects collection
var subject = new Datastore({ filename: 'db/subject.db', autoload: true });
subject.loadDatabase();
//connection to the Admin collection
var admin = new Datastore({ filename: 'db/admin.db', autoload: true });
admin.loadDatabase();
//connection to the Quiz collection
var quiz = new Datastore({ filename: 'db/quiz.db', autoload: true });
quiz.loadDatabase();
//connection to the Quiz Result collection
var quizResult = new Datastore({ filename: 'db/quizResult.db', autoload: true });
quizResult.loadDatabase();




//========================== Routes
// Essential
require('./routes/index')(app,users,statics);
// Admin
require('./routes/admin')(app,users,statics);
// Simulations
require('./routes/simulations')(app,users,statics);
// Plus
require('./routes/plus')(app,users,statics);
// test = for development only
require('./routes/test')(app,users,statics);






var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
