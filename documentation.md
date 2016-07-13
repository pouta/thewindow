10 questions:
form-encoded

init:
	url:		http://windowvationquizserver.elasticbeanstalk.com/api
	request:	GET

send name:
	url:		http://windowvationquizserver.elasticbeanstalk.com/begin
	request:	POST
	body:		name='name'
	response:	"Hello PedroTest1! GET the first question from /user/80/question"

get question:
	url: 		http://windowvationquizserver.elasticbeanstalk.com/user/77/question
	request:	GET
	response: 	"What is 37 times 43? POST answer=[answer] to /user/80/answer"

answer question:
	url:		http://windowvationquizserver.elasticbeanstalk.com/user/77/answer
	request:	POST
	body:		answer=123
	response:	"Correct! GET the next question from /user/80/question"

last answer:
	response:	"You already finished! No more questions"

