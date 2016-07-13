var _ = require('lodash');

module.exports = {
	start: function(req, res){
		var name = req.query.name;

		if(!_.isNil(name)) {
			
		}else{
			console.log("name missing.")
		}
	}
};