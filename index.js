var express = require('express');
var bodyparser = require('body-parser');

var testController = require('./controller/testCtrl.js');

var app = express();
app.use(bodyparser.text());

var port = process.env.PORT || 5000;
var router = express.Router();


router.get('/start', function (req, res) {
	testController.start(req, res);
});

app.use('/api', router);

app.listen(port);
console.log('app live in port: ' + port + '\nGET /api/start?name=pedro to kick things off');
