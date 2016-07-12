var express = require('express');
var bodyparser = require('body-parser');


var app = express();
app.use(bodyparser.json());
var port = process.env.PORT || 5000;
var router = express.Router();


router.get('/', function(req, res) {
	res.send("The window starts here");
});

app.use('/api', router);

app.listen(port);
console.log('app live in port: ' + port);
