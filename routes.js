//module.exports = function(app){
  //var multer = require('multer');














  ///////////////////////////////////////////////////////////////////////////////////////////////////////










  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
  };
  var modify = function(x,y){
      var res = x.toString().replaceAll("images/",y+"/img/");
  return res;
  }
  var move = function(){

  }













































  app.get('/process_get', function (req, res) {
      response = {
         first_name:req.query.first_name,
         last_name:req.query.last_name
      };
      users.insert(response, function (err, newDoc) {
       });
      res.end(JSON.stringify(response));
  })
  var storage = multer.diskStorage({
  	destination: function(req, file, callback) {
  		callback(null,__dirname+'/public/sims');
  	},
  	filename: function(req, file, callback) {
  		console.log(file);
          //callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          callback(null, "hello.zip");
  	}
  });
  var upload = multer({
      storage: storage,
      fileFilter: function(req, file, callback) {
          var ext = path.extname(file.originalname)
          if (ext !== '.zip') {
              return callback(res.end('Only Zip files are allowed'), null)
          }
      }/*,
      onFileUploadComplete: function (file) {
          fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }));
          console.log(file.fieldname + ' uploaded to  ' + file.path);
      }*/
  }).single('userFile');
  app.get('/insert', function (req, res) {
      res.render('insert');
  })

  var c = function(){
      var x = fs.readFile(__dirname+'/public/sims/plugin/about.json');
      var xx = JSON.parse(x);
      res.send(xx.author);
      console.log("teamr!!!");
  }




   })
//}
