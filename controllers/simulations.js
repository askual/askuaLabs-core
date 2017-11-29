module.exports = function(app,scripts,db) {
    app.get('/9phy', function (req, res) {
        let sim;
        db.simulations.find({ grade: "9", subject: "physics"}, function (err, doc) {
            sim = doc;
            db.subjects.find({grade: "9", name: "physics"}, function (err, docs) {
                res.render('simulations/subj',{
                    data:docs,statics:scripts.default(),sims:sim,class:"user-view-g9p",welcome:"Grade 9 Physics",selectClass:"phybg",
                    simss : encodeURIComponent(JSON.stringify(sim)),now:"9phy"
                });
            })
        });
    });
    

    app.get('/9che', function (req, res) {
        var sim;
        db.simulations.find({ grade: "9", subject: "chemistry"}, function (err, doc) {
            sim = doc;
            db.subjects.find({grade: "9", name: "chemistry"}, function (err, docs) {
                res.render('simulations/subj',{
                    data:docs,statics:scripts.default(),sims:sim,class:"user-view-g9c",welcome:"Grade 9 Chemistry",selectClass:"chmbg",
                    simss : encodeURIComponent(JSON.stringify(sim)),now:"9che"
                });
            })
        });
    });

    app.get('/9bio', function (req, res) {
        var sim;
        db.simulations.find({ grade: "9", subject: "biology"}, function (err, doc) {
            sim = doc;
            db.subjects.find({grade: "9", name: "biology"}, function (err, docs) {
                res.render('simulations/subj',{
                    data:docs,statics:scripts.default(),sims:sim,class:"user-view-g9b",welcome:"Grade 9 Biology",selectClass:"biobg",
                    simss : encodeURIComponent(JSON.stringify(sim)),now:"9bio"
                });
            })
        });
    });

    app.get('/sim/:sim_id', function(req, res, next) {
        var sim_id = req.params.sim_id;
        db.simulations.find({_id:sim_id}, function (err, docs) {
              res.render('simulations/simulation',{data:docs,statics:scripts.default(),parent:sim_id,class:"user-view-hm",welcome:"",});
          });
    });
    app.get('/real/:sim_id', function(req, res, next) {
        var sim_id = req.params.sim_id +".js";
        res.render('simulations/real',{link:sim_id,statics:scripts.default()});
    });
    app.get('/9phy/:sim', function (req, res) {
        var sim_id = req.params.sim;
        db.simulations.find({_id:sim_id}, function (err, docs) {
              res.render('simulations/simulation',{data:docs,statics:scripts.default(),parent:sim_id,class:"user-view-hm",welcome:"",});
        });
    });
    app.get('/9che/:sim', function (req, res) {
        var sim_id = req.params.sim;
        db.simulations.find({_id:sim_id}, function (err, docs) {
              res.render('simulations/simulation',{data:docs,statics:scripts.default(),parent:sim_id,class:"user-view-hm",welcome:"",});
          });
    });
    app.get('/9bio/:sim', function (req, res) {
        //res.send(req.params.sim);
        var sim_id = req.params.sim;
        db.simulations.find({_id:sim_id}, function (err, docs) {
              res.render('simulations/simulation',{data:docs,statics:scripts.default(),parent:sim_id,class:"user-view-hm",welcome:"",});
          });
    });
}
