module.exports = function(app,users,statics) {

    app.get('/9phy', function (req, res) {
        var sim;
        simulation.find({ grade: "9", subject: "physics"}, function (err, doc) {
            sim = doc;
            subject.find({grade: "9", name: "physics"}, function (err, docs) {
                console.log("ddd",docs,sim);
                res.render('subj',{
                    data:docs,statics:statics,sims:sim,class:"user-view-g9p",welcome:"Grade 9 Physics",selectClass:"phybg",
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
                    data:docs,statics:statics,sims:sim,class:"user-view-g9c",welcome:"Grade 9 Chemistry",selectClass:"chmbg",
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
                    data:docs,statics:statics,sims:sim,class:"user-view-g9b",welcome:"Grade 9 Biology",selectClass:"biobg",
                    simss : encodeURIComponent(JSON.stringify(sim))
                });
            })
        });
    });

    app.get('/sim:sim_id', function(req, res, next) {
        var sim_id = req.params.sim_id;
        sim_id = sim_id.slice(1, sim_id.length);
        simulation.find({_id:sim_id}, function (err, docs) {
              res.render('simulation',{data:docs,statics:statics,parent:sim_id,class:"user-view-hm",welcome:"",});
          });
    });

    // gotosim
    app.get('/real:sim_id', function(req, res, next) {
        var sim_id = req.params.sim_id;
        sim_id = sim_id.slice(1, sim_id.length)+".js";
        res.render('real',{link:sim_id,statics:statics});
    });
}
