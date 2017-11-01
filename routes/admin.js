module.exports = function(app,users,statics) {
  app.get('/admin',function(req,res){
      res.render('admin',{statics:statics});
  });
  app.get('/admin_acc',function(req,res){
      res.render('admin_acc',{statics:statics});
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
  app.get('/admin_quiz_detail:quiz_id',function(req,res){
    var quiz_id = req.params.quiz_id;
    quiz_id = quiz_id.slice(1, quiz_id.length);
    quizResult.find({quiz_id:quiz_id}, function (err, docs) {
        res.render('admin_quiz_detail',{data:docs});
    });
  });
}
