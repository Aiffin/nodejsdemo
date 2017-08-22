var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Login = require('./models/login');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({entended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root123@ds153413.mlab.com:53413/register', {useMongoClient: true})
.then(function() {
	console.log("Connected");
})
.catch(function(error) {
	console.log(error);
});

var router = express.Router();

router.get('/',function(req,res){
	res.json({
		messgae:"welcome"
	});
	
});

router.route('/logins')

	.post(function(req, res){
		var login = new Login();
		login.name = req.body.name;
		login.password = req.body.password;
		login.save(function(err) {
			if(err)
				res.send(err);

			res.json({message:"registered"});
		});
	})

	.get(function(req, res){
		Login.find(function(err, logins) {
			if (err)
				res.send(err);

			res.json(logins);
		});
	});

router.route('/logins/:login_id')


	.get(function(req, res) {
		Login.findById(req.params.login_id, function(err, login) {
			if (err)
				res.send(err);
			res.json(login);
		});
	})


	.put(function(req, res) { 
		Login.findById(req.params.login_id, function(err, login) {

			if (err)
				res.send(err);

			login.name = req.body.name;

			login.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'updated!' });
			});

		});
	})


	.delete(function(req, res) {
			Login.remove({
			_id: req.params.login_id
		}, function(err, login) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/api',router);

app.listen(port);
console.log('magic happens' + port);