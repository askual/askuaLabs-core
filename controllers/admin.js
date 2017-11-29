module.exports = function(app,scripts,db) {
  app.get('/admin',function(req,res){
      res.render('admin/admin',{statics:scripts.default()});
  });
 
  
  app.get('/admin_login',function(req,res){
        db.admin.find({}, function (err, doc) {
            if(doc[0].password == req.query.pass){
                db.simulations.find({isbuiltin:false}, function (err, docs) {
                    res.render('admin/admin_sim',{
                        statics:scripts.default(), data:docs,active:{"sim":"active","quiz":"","acc":""}
                    });
                });
            }
        });
    });
  
  app.get('/admin_sim',function(req,res){
      db.simulations.find({isbuiltin:false}, function (err, docs) {
          res.render('admin/admin_sim',{
              statics:scripts.default(),data:docs,active:{"sim":"active","quiz":"","acc":""}
            });
      });
  });
    app.get('/admin_acc',function(req,res){
        res.render('admin/admin_acc',{
            statics:scripts.default(),active:{"sim":"","quiz":"","acc":"active"}
        });
    });
    app.get('/admin_quiz',function(req,res){
        db.quizs.find({}, function (err, docs) {
            res.render('admin/admin_quiz',{statics:scripts.default(),data:docs});
        });
    });
  
    /*
  app.get('/admin_simD:sim_id', function(req, res, next) {
      var sim_id = req.params.sim_id;
      sim_id = sim_id.slice(1, sim_id.length);
      // Delete the sim_id.js + delete the sim_id folder + delete the sim_id from simulation.db
      res.render('real',{link:sim_id});
  });
  app.get('/admin_quiz_detail:quiz_id',function(req,res){
    var quiz_id = req.params.quiz_id;
    quiz_id = quiz_id.slice(1, quiz_id.length);
    quizResult.find({quiz_id:quiz_id}, function (err, docs) {
        res.render('admin_quiz_detail',{data:docs});
    });
  });
    */
}
