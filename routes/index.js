var React = require('react/addons'),
App = React.createFactory(require('../src/components/App')),
routes = require("../src/routes");


exports.home = function (req, res){
   // var markup = React.renderToString(App());
   // // Render our 'home' template
   // res.render('index',{
   //    content: markup,
   //  });
	
	var router = Router.create({location: req.url, routes: routes})
  	router.run(function(Handler, state) {
    var html = React.renderToString(<Handler/>)
    return res.render('index', {content: html})
  })
}

