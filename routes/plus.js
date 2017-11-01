module.exports = function(app,users,statics) {

  app.get('/quiz_detail_download:quiz_id', function(req, res) {
      var quiz_id = req.params.quiz_id;
      quiz_id = quiz_id.slice(1, quiz_id.length);
  //console.log("wow",quiz_id);
      quizResult.find({_id:quiz_id}, function (err, docs,next) {
          let filefile = __dirname + "/public/temp/quiz"+quiz_id+".json";
          fs.openSync(filefile, 'w');
          fs.writeFile(filefile, JSON.stringify(docs[0]), (err) => {
              if (err) throw err;
              console.log('Data saved!');
              //next();
              //res.send("Data Saved");
              //var file = __dirname+ "/public/quiz/" + quiz_id.slice(1, quiz_id.length)+".json";
              res.download(filefile);
          });
          //*/
      });
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
}
