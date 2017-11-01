module.exports = function(app,users,statics) {
  app.get('/', function (req, res) {
      users.find({}, function (err, docs) {
          res.render('index',{data:docs,statics:statics,class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
      });
  });
  app.get('/index.html', function (req, res) {
      users.find({}, function (err, docs) {
          res.render('index',{data:docs,statics:statics, class:"user-view-hm",welcome:"Welcome To AskuaLabs"});
      });
  });


  app.get('/explore', function (req, res) {

      simulation.find({}, function (err, doc) {
          res.render('explore',{
              data:doc,statics:statics,class:"user-view-hm",welcome:"Explore"
          });
      });
  });

  app.get('/help', function (req, res) {
      res.render('help',{statics:statics,class:"user-view-hm",welcome:"Help"});
  });
  app.get('/about', function (req, res) {
      res.render('about',{class:"user-view-hm",statics:statics,welcome:"About"});
  });
}
