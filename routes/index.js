// exports.home = function (req, res){
//    res.sendFile('build/index.html');
// }

var React = require('react/addons'),
App = React.createFactory(require('../src/components/App'));

exports.home = function (req, res){
	console.log("HEEEY ");
   var markup = React.renderToString(App());
   console.log("markup");
   console.log(markup);
   // Render our 'home' template
   res.render('index',{
      content: markup,
    });
   
}