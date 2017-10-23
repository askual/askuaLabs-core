var express = require('express');
var app = express();
var hbs = require('hbs');
var Datastore = require('nedb');
var fs = require('fs-extra');
var path = require('path');
var multer = require('multer');
var unzip = require('unzip');
var fileUpload = require('express-fileupload');
var decompress = require('decompress');
var fss = require('fs-extra');
var extract = require('extract-zip');
app.use(fileUpload());


app.locals.title = 'AskuaLabs';
//regarding scripts and styles
let scripts =  {
  "materialize" : "libs/js/materialize.min.js",
  "jquery" : "libs/js/plugins/jquery-1.11.2.min.js",
  "countdown" : "libs/js/plugins/jquery.countdown-2.1.0/jquery.countdown.js",
  "sweetalert" : "libs/js/plugins/sweetalert/sweetalert.min.js",
  "perfectscroll" : "libs/js/plugins/perfect-scrollbar/perfect-scrollbar.min.js"
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
  let ans  = array();
  if(data==undefined){
    if(type=="style")
      ans.push();
    else if(type=="script")
      ans.push();
  }

  for(let l=0;l<data.length;l++){
    if(type=="style")
      ans.push(styles[data[l]]);
    else if(type=="script")
      ans.push(scripts[data[l]]);
  }
return ans;
}
//////////////////////////////////////////////////////////////////////////////



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

//connection to the users collection
var users = new Datastore({ filename: 'db/user.db', autoload: true });
users.loadDatabase();
//connection to the simulations collection
var simulation = new Datastore({ filename: 'db/simulation.db', autoload: true });
simulation.loadDatabase();
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


app.get('/', function (req, res) {
    users.find({}, function (err, docs) {
        res.render('index',{data:docs,class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
    });
});
app.get('/index.html', function (req, res) {
    users.find({}, function (err, docs) {
        res.render('index',{data:docs,class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
    });
});


app.get('/explore', function (req, res) {
    simulation.find({}, function (err, doc) {
        res.render('explore',{
            data:doc,class:"user-view-hm",welcome:"Explore"
        });
    });
});
app.get('/9phy', function (req, res) {
    var sim;
    simulation.find({ grade: "9", subject: "physics"}, function (err, doc) {
        sim = doc;
        subject.find({grade: "9", name: "physics"}, function (err, docs) {
            console.log("ddd",docs,sim);
            res.render('subj',{
                data:docs,sims:sim,class:"user-view-g9p",welcome:"Grade 9 Physics",selectClass:"phybg",
                simss : encodeURIComponent(JSON.stringify(sim))
            });
        })
    });
});
app.get('/9che', function (req, res) {
    var sim;
    simulation.find({ grade: "9", subject: "chemistry"}, function (err, doc) {
        sim = doc;
        subject.find({grade: "9", name: "chemistry"}, function (err, docs) {
            console.log("ddd",docs,sim);
            res.render('subj',{
                data:docs,sims:sim,class:"user-view-g9c",welcome:"Grade 9 Chemistry",selectClass:"chmbg",
                simss : encodeURIComponent(JSON.stringify(sim))
            });
        })
    });
});
app.get('/9bio', function (req, res) {
    var sim;
    simulation.find({ grade: "9", subject: "biology"}, function (err, doc) {
        sim = doc;
        subject.find({grade: "9", name: "biology"}, function (err, docs) {
            console.log("ddd",docs,sim);
            res.render('subj',{
                data:docs,sims:sim,class:"user-view-g9b",welcome:"Grade 9 Biology",selectClass:"biobg",
                simss : encodeURIComponent(JSON.stringify(sim))
            });
        })
    });
});

app.get('/sim:sim_id', function(req, res, next) {
    var sim_id = req.params.sim_id;
    sim_id = sim_id.slice(1, sim_id.length);
    simulation.find({_id:sim_id}, function (err, docs) {
          res.render('simulation',{data:docs,parent:sim_id,class:"user-view-hm",welcome:"",});
      });
});

// gotosim
app.get('/real:sim_id', function(req, res, next) {
    var sim_id = req.params.sim_id;
    sim_id = sim_id.slice(1, sim_id.length)+".js";
    res.render('real',{link:sim_id});
});

app.get('/help', function (req, res) {
    res.render('help',{class:"user-view-hm",welcome:"Help"});
});
app.get('/about', function (req, res) {
    res.render('about',{class:"user-view-hm",welcome:"About"});
});


app.get('/admin',function(req,res){
    res.render('admin');
});
app.get('/admin_acc',function(req,res){
    res.render('admin_acc');
});
app.get('/admin_sim',function(req,res){
    simulation.find({isbuiltin:false}, function (err, docs) {
        res.render('admin_sim',{data:docs});
    });
});
app.get('/admin_simD:sim_id', function(req, res, next) {
    var sim_id = req.params.sim_id;
    sim_id = sim_id.slice(1, sim_id.length);
    // Delete the sim_id.js + delete the sim_id folder + delete the sim_id from simulation.db
    res.render('real',{link:sim_id});
});

app.get('/admin_quiz',function(req,res){
    quiz.find({}, function (err, docs) {
        res.render('admin_quiz',{data:docs});
    });
    //res.render('admin_quiz');
});
app.post('/admin_quiz_upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    var d = __dirname+'/public/quizs/h.json';
    var sampleFile = req.files.sampleFile;
    sampleFile.mv(d, function(err) {
      if (err)
        return res.status(500).send(err);
      fs.readFile(d, (err, data) => {
          if (err) throw err;
          var v = JSON.parse(data.toString());
          quiz.insert(v, function (err, Doc) {
            console.log(v.title);
            res.send(v.title);
          });
        });
    });
  });
  app.get('/takeQuiz:quiz_id', function(req, res, next) {
      var quiz_id = req.params.quiz_id;
      quiz_id = quiz_id.slice(1, quiz_id.length);
      //res.render('takequiz',{link:quiz_id});
      quiz.find({_id:quiz_id}, function (err, doc) {
          res.render('takequiz',{quiz_id:quiz_id,time:doc[0].timeAllowed,size:doc[0]["answers"].length,data:encodeURIComponent(JSON.stringify(doc[0]["questions"]))});
      });
  });

app.get('/adminP',function(req,res){
    admin.find({}, function (err, doc) {
        if(doc[0].password == req.query.pass){
            res.render('admin_sim');
        }
    });
});






///////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/q', function (req, res) {
    res.render('question');
});
app.get('/qq', function (req, res) {
    response = {
        name:req.query.name,
        grade:req.query.grade,
        rollno:req.query.rollno,
        section:req.query.section,
        password:req.query.password
     };
});


app.get('/signup', function (req, res) {
    res.render('signup');
});
app.get('/signupP', function (req, res) {
    response = {
        name:req.query.name,
        grade:req.query.grade,
        rollno:req.query.rollno,
        section:req.query.section,
        password:req.query.password
     };
    users.find({ grade: response.grade, rollno: response.rollno, section:response.section}, function (err, doc) {
        if(doc.length>0){
            console.log("What???");
            res.end(JSON.stringify(response));
        }else{
            users.insert(response, function (err, newDoc) {
            });
            res.end(JSON.stringify(response));
        }
    });

})
app.get('/quiz', function (req, res) {
    quiz.find({}, function (err, docs) {
        res.render('quiz',{data:docs,class:"user-view-hm",welcome:"AskuaLabs Quiz"});
    });
});

app.get('/loginP', function (req, res) {
    response = {
        grade:req.query.grade,
        rollno:req.query.rollno,
        section:req.query.section,
        password:req.query.password
    };

    users.find({ grade: response.grade , rollno: response.rollno, section:response.section}, function (err, doc) {
        if(doc.length==0){
            res.send("Please Sign Up");
        }else if(doc[0].password!=response.password){
            res.send("Wrong Password");
        }else{
            res.send("Correct");
            console.log(doc);
        }
    });

})

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







app.get('/hehe', function (req, res) {
    //fs.renameSync(__dirname+'/public/sims/plugin/sim.js',__dirname+'/public/sims/plugin/sim.txt');
    var v = __dirname+'/public/sims/plugin/about.json';
    var json = JSON.parse(require('fs').readFileSync(v, 'utf8'));

    var response = {
        title:json.title,
        version:json.version,
        grade:json.grade,
        subject:json.subject,
        unit:json.unit,
        thumbnail:json.thumbnail,
        author:json.author,
        email:json.email,
        website:json.website,
        description:json.description,
        theory:json.theory,
     };
     //res.end(JSON.stringify(response));
    simulation.insert(response, function (err, Doc) {
        fs.readFile(__dirname+'/public/sims/plugin/sim.js','utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            var content = modify(data,Doc._id);
            console.log("w=w",content);
            fs.writeFile(__dirname + "/public/sims/plugin/sim.js", content, (err) => {
                if (err) throw err;

                fs.renameSync(__dirname+'/public/sims/plugin/',__dirname+'/public/sims/'+Doc._id+"/");

            });
        });
    });
})



app.post('/upup', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let sampleFile = req.files.sampleFile;
    sampleFile.mv(__dirname+'/public/sims/hello.zip');
    decompress(__dirname+'/public/sims/hello.zip', __dirname+'/public/sims/plugin');

    res.render('thanks');

    /*
    //fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }));
    var unzipExtractor = unzip.Extract({ path: __dirname+'/public/sims/hello.zip'});
    // listen for close event and perform parse
    //unzipExtractor.on('close', function(){console.log("fuck!")});*/
  });



  app.post('/upup5', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname+'/public/sims/hello.zip', function(err) {
        if (err)
            return res.status(500).send(err);
        var unzipExtractor = unzip.Extract({ path: __dirname+'/public/sims/hello.zip'});
        // listen for close event and perform parse
        unzipExtractor.on('close', function(){
            console.log("fuck!")});

        /*    extract(__dirname+'/public/sims/hello.zip', {dir: __dirname+'/public/sims/plugin'}, function (err) {
            res.render('thanks');
        });

        res.render('thanks');
        /*fs.createReadStream(__dirname+'/public/sims/hello.zip')
        .pipe(unzip.Extract({ path: __dirname+'/public/sims' }))
         .on('close', function () {
            var v = __dirname+'/public/sims/plugin/about.json';
            var json = JSON.parse(require('fs').readFileSync(v, 'utf8'));

            var response = {
                title:json.title,
                version:json.version,
                grade:json.grade,
                subject:json.subject,
                unit:json.unit,
                thumbnail:json.thumbnail,
                author:json.author,
                email:json.email,
                website:json.website,
                description:json.description,
                theory:json.theory,
                isbuiltin:false
             };
             console.log(response.title);
         });
         */
    });
  });






































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

app.post('/insert2', function(req, res) {
    console.log("???");

    upload(req, res, function(err) {
        ///*
        console.log("====");
        fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }));

        //c();
        console.log("one");
        res.send("UUC");
        //*/
    });

    /*
    var result = '';
    multer({
      inMemory: true,
      onFileUploadData: function(file, data) {
        result += data;
      },
      onFileUploadComplete: function(file) {
        console.log(result); // This is what you want
      }
    }).single('userFile')(req, res, next);
    */

  });
  app.post('/insert', function(req, res) {
    upload(req, res, function(err) {
        fs.createReadStream(__dirname+'/public/sims/hello.zip')
            .pipe(unzip.Extract({ path: __dirname+'/public/sims' }))
            .on('close', function () {
                res.render('thanks');
            });
        });
    });
app.post('/inssert2', function(req, res) {

	upload(req, res, function(err) {
        console.log("one");


        fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }));
        /*
        var about =  require(__dirname+'/public/sims/plugin/about.json');
        console.log("hell",about);
        /*
        fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }), function(err){
            console.log("two");
            fs.readFile(__dirname+'/public/sims/plugin/about.json', 'utf8',function(err,data){
                console.log("three");
                var xx = JSON.parse(data);
                console.log(xx.author);
                res.send("yax!!");
            });
        });
        /*
        var x = fs.readFile(__dirname+'/public/sims/plugin/about.json');
        var xx = JSON.parse(x.toString());
        res.send(xx.author);

        fs.createReadStream(__dirname+'/public/sims/hello.zip').pipe(unzip.Extract({ path: __dirname+'/public/sims' }));

        fs.readFile(__dirname+'/public/sims/plugin/about.json', function(err, data) {
            var x = JSON.parse(data.toString());
            res.send(x.author);
        });
        */





        //res.end('File is uploaded');
	});
});




app.get('/isubject3', function (req, res) {
    response = {
        title:req.query.title,
        grade:req.query.grade,
        subject:req.query.subject,
        unit:req.query.unit,
        pic:req.query.pic,
        description:req.query.description,
        theory:req.query.theory,
        isbuiltin:true
     };
     //res.end(JSON.stringify(response));
    simulation.insert(response, function (err, newDoc) {
    });
 })
 app.get('/isubject2', function (req, res) {
    response1 = {
        name:req.query.name,
        grade:req.query.grade
     };
     response2 = {
        unit:req.query.unit,
        title:req.query.title
     };

    subject.update({ name: response1.name ,grade: response1.grade}, { $push: { units: response2 } }, {}, function () {
        // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
      });
 })
 app.get('/isubject', function (req, res) {
    response = {
       name:req.query.name,
       grade:req.query.grade
    };
    subject.insert(response, function (err, newDoc) {
     });
 })
 app.get('/isubject7', function (req, res) {
    var v = "hell.js";
    fs.openSync(__dirname + "/public/sims/"+v, 'w');
    response = {
       sim:req.query.sim
    };

    fs.writeFile(__dirname + "/public/sims/"+v, response.sim, (err) => {
        if (err) throw err;
        console.log('Lyric saved!');
    });
 })



 app.get('/quizfinish:quiz_id', function (req, res) {
     let quiz_id = req.params.quiz_id;
     quiz_id = quiz_id.slice(1, quiz_id.length);

     let response = {
        name:req.query.name,
        section:req.query.section,
        rollno:req.query.rollno,
        size:req.query.size,


        quiz_id: quiz_id/*
        q1:req.query.q1 || "-",
        q2:req.query.q2 || "-",
        q3:req.query.q3 || "-",
        q4:req.query.q4 || "-",
        q5:req.query.q5 || "-",
        q6:req.query.q6 || "-",
        q7:req.query.q7 || "-",
        q8:req.query.q8 || "-",
        q9:req.query.q9 || "-",
        q10:req.query.q10 || "-"*/
     };
     for(let v=1;v<=req.query.size;v++){
       eval("response[\"q"+v+"\"]=req.query.q"+v+";");
     }
     //var v = JSON.parse(data.toString());
     quizResult.insert(response, function (err, Doc) {
        res.send(response.q1);
     });



 })














































var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
