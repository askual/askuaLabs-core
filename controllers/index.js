module.exports = function(app,scripts,db) {

    app.get('/', function (req, res) {
        res.render('essentials/index',{statics:scripts.default(),class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
      });
    app.get('/index', function (req, res) {
        res.render('essentials/index',{statics:scripts.default(),class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
    });

    app.get('/index.html', function (req, res) {
    res.render('essentials/index',{statics:scripts.default(),class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
    });

    app.get('/explore', function (req, res) {
        db.simulationa.find({}, function (err, doc) {
            res.render('essentials/explore',{
                data:doc,statics:scripts.default(),class:"user-view-hm",welcome:"Explore"
            });
        });
    });

    app.get('/help', function (req, res) {
        res.render('essentials/help',{statics:scripts.default(),class:"user-view-hm",welcome:"Help"});
    });
    app.get('/about', function (req, res) {
        res.render('essentials/about',{class:"user-view-hm",statics:scripts.default(),welcome:"About"});
    });
}
