var React = require('react/addons'),
ReactApp = React.createFactory(require('../react/components/ReactApp'));
// "/"
exports.home = function (req, res){
   
   var initProps = {
      "username": "Alec Robins",
      "names": ['alec', 'joe', 'bob'],
      "id": 1,
      "currentDate": new Date()
   };

   var markup = React.renderToString(ReactApp(initProps));

   // Render our 'home' template
   res.render('home',{
      markup: markup,
      test: JSON.stringify(initProps)
    });
}