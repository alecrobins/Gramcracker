var TestDataActions = require('../actions/TestDataActions');

//TODO: this is where I will be making API calls to my server

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getTestData: function() {
    var data = {
    	testData: {
    		"names": ['alec', 'joe', 'bob'],
    		"id": 1,
    		"currentDate": new Date()
    	}
    };

    TestDataActions.loadData(data);
  }

};