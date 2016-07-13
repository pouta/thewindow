var _ = require('lodash');
var request = require('request');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);
var baseUrl = process.env.BASE_URL;

module.exports = {
	startExercise: function(name){

		if(!_.isNil(name)) {

			var options = { 
				method: 'POST',
  				url: baseUrl+'/begin',
  				formData: { name: name } 
  			};

			request(options, function (error, response, body) {
  				if (error) throw new Error(error);

  				var response = _.split(body, '/');
  				console.log("user ID = " + response[2]);
  				userID = response[2];
  				startQuestions(userID);
			});
		}else{
			return false;
			console.log("name missing.")
		}
	}
};

var endCallback = function() {
	console.log("YESSSS. Make another resquest to answer some more questions.");
}

var startQuestions = function(UserID){
	userUrl = baseUrl + "/user/" + userID;
	var question = getQuestion(userUrl);
};

var getQuestion = function(userUrl){
	var options = { 
		method: 'GET',
  		url: userUrl+'/question'
  	};

	request(options, function (error, response, body) {
  		if (error) throw new Error(error);

  		var response = _.split(body, '\n');
  		console.log(response[0]);
  		question = response[0];
  		answerQuestion(userUrl, question, endCallback)
	});
};

var answerQuestion = function(userUrl, question, endCallback){
	wolfram.query(question, function(error, result){
		if (error) throw new Error(error);

		console.log("Result: ", result[1].subpods[0].value);

		var answer = result[1].subpods[0].value;

		var options = { 
			method: 'POST',
  			url: userUrl+'/answer',
  			formData: { answer: answer }
  		};

  		request(options, function (error, response, body) {
  			if (error) throw new Error(error);

  			var response = _.split(body, '\n');
  			var firstLine = response[0];
  			console.log(firstLine);
  			var words = _.split(firstLine, ' ');
  			if(words[0].localeCompare("Well") == 0){
  				endCallback();
  			}else{
  				getQuestion(userUrl);
  			}
		});

	});
};