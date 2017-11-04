module.exports = function(app,users,statics) {

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




}
