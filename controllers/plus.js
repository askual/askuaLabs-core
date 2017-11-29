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
});

}
