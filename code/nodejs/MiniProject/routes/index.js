var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundDb');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  Round: String,
  Total: String,
  Straight: String,
  Hooks: String,
  Uppercuts: String
});

var UserData = mongoose.model('round', userDataSchema);

router.get('/', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('index', {title: "Final Year Project", items: doc});
      });
});

router.post('/fetchPostExamaple', function(req, res, next) {

  console.log("received: ");

  console.log(req.body.firstParam);

  console.log(req.body.secondParam[1]);

  console.log(req.body.secondParam[1].x);

//  res.render('carDetailsPage', {title: "Car Details", theCarDetails: "dummy"});

  res.status(201).send({id:'123'});

});

module.exports = router;
