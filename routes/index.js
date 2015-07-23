var React = require('react/addons'),
ReactApp = React.createFactory(require('../react/components/ReactApp'));
// "/"
exports.home = function (req, res){
   
   var testData = {
    "hello": "world"
   }

   var markup = React.renderToString(ReactApp({testData: testData}));

   // Render our 'home' template
   res.render('home', { markup: markup });
}