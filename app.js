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
      extract = require('extract-zip'),
      router = express.Router();


//========================== scripts and styles
let askualabs_script = {};
askualabs_script.scripts =  {
  "materialize" : "../../libs/js/materialize.min.js",
  "countdown" : "../../libs/js/plugins/jquery.countdown-2.1.0/jquery.countdown.js",
  "jquery" : "../../libs/js/plugins/jquery-1.11.2.min.js",
  "perfectscroll" : "../../libs/js/plugins/perfect-scrollbar/perfect-scrollbar.min.js",
  "sweetalert" : "../../libs/js/plugins/sweetalert/sweetalert.min.js",
  "custom": "../../libs/js/script.js"
}
askualabs_script.styles =  {
  "materialize" : "../../libs/css/materialize.css",
  "perfectscroll" : "../../libs/js/plugins/perfect-scrollbar/perfect-scrollbar.css",
  "sweetalert" : "../../libs/js/plugins/sweetalert/sweetalert.css",
  "dropify" : "../../libs/js/plugins/dropify/dropify.css",
  "custom" : "../../libs/css/style.css",
  "fontawesome" : "../../libs/font-awesome/css/font-awesome.min.css",
}
askualabs_script.enqueue_script = function(type,data){
  let ans  = [];
  if(data==undefined){
    if(type=="style")
      data  = Array("fontawesome","materialize","perfectscroll","custom");
    else if(type=="script")
      data  = Array("jquery","materialize","perfectscroll","custom");
  }
  for(let l=0;l<data.length;l++){
    if(type=="style")
      ans.push(this.styles[data[l]]);
    else if(type=="script")
      ans.push(this.scripts[data[l]]);
  }
return ans;
}
askualabs_script.default = function(){
  let ans = {};
  ans.script = this.enqueue_script("script");
  ans.style =  this.enqueue_script("style");
return ans;
}

//========================== application wide declarations
app.use(fileUpload());
app.locals.title = 'AskuaLabs';
//treat html files as hbs files
app.set('view engine', 'html');
app.engine('html', hbs.__express);
//Static files from public
app.use(express.static('public'));
//partials
hbs.registerPartials(__dirname + '/views/partials' );
//hbs helpers
hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});


//========================== Databases
//connection to the simulations collection
var simulations = new Datastore({ filename: 'db/simulation.db', autoload: true });
simulations.loadDatabase();
//connection to the subjects collection
var subjects = new Datastore({ filename: 'db/subject.db', autoload: true });
subjects.loadDatabase();
//connection to the Admin collection
var admin = new Datastore({ filename: 'db/admin.db', autoload: true });
admin.loadDatabase();
//connection to the Quiz collection
var quizs = new Datastore({ filename: 'db/quiz.db', autoload: true });
quizs.loadDatabase();
//connection to the Quiz Result collection
var quizResults = new Datastore({ filename: 'db/quizResult.db', autoload: true });
quizResults.loadDatabase();




//========================== Controllers
// Essential
require('./controllers/index')(app,askualabs_script,{
    "simulations":simulations
  });
// Simulations
require('./controllers/simulations')(app,askualabs_script,{
    "simulations":simulations,"subjects": subjects
  });
// Admin
require('./controllers/admin')(app,askualabs_script,{
    "admin": admin,"simulations":simulations,"quizs":quizs
});

// Plus
//require('./controllers/plus')(app,askualabs_script,users);
//for development only
//require('./controllers/dev')(app,askualabs_script,users);






var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
