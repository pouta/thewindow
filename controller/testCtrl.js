var _ = require('lodash');
var testModel = require('../model/testmodel.js');

module.exports = {
	start: function(req, res){
		var name = req.query.name;
		if(!_.isNil(name)) {
			res.sendStatus(200);
			testModel.startExercise(name);
		}else{
			console.log("name missing.")
		}
	}
};