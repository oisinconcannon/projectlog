var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundDb');
var Schema = mongoose.Schema;

// https://github.com/mschwarzmueller/nodejs-basics-tutorial/blob/master/11-mongoose/routes/index.js

var userDataSchema = new Schema({
  name: {type: String},
  address: {type: String},
  gymName: {type: String},
  opponentName: {type: String},
  dateTime: {type: String},
  punchInfo: {type: Array}
}, {collection: 'eventDetails'});

var UserData = mongoose.model('eventDetails', userDataSchema);
var xData = [];
var yData = [];
var zData = [];
var x = 0;
router.post('/savePostTextToMongo', function(req, res, next) {
  var item =  req.body;
  var data = new UserData(item);
  data.save();

  console.log("Saved post: ");
  console.log(req.body);
  res.status(201).send({});
});

router.post('/getAppPosts', function(req, res, next) {
  var item =  req.body.search;
  console.log(item);
//  var data = new UserData(item);
  UserData.find({name:item})
    .then(function(doc) {
      console.log("Sending: " + doc.length + " posts to app");
      res.status(201).send({posts: doc});
    });
});

router.get('/sendHeight', function(req, res, next) {
  console.log("Got ESP data!");
  res.status(201).send({});
});

router.post('/getAppNames', function(req, res, next) {
  let theObj = {days: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
                months: ["January", "Febuary", "March", "April",  "May", "June","May","June","July","August","September","October","November","December"],
                years: ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031"]};
  console.log("Send data to App");
  console.log(theObj.days.length);
    console.log(theObj.days);
  res.status(201).send(theObj);
});
router.post('/fetchPostExamaple', function(req, res, next) {
  console.log("received: ");
  console.log(req.body.firstParam);
  console.log(req.body.secondParam[1]);
  var newData = req.body.secondParam;
  for(var ii = 0; ii < newData.length; ii++){
    xData.push(newData[ii].x);
    if(newData[ii].x >0.5){
      x=x+1;
      console.log("punch thrown:"+ x);
    }
    if(xData.length > 600){
      xData.shift();
    }
    // repeat for y and z
  }
  res.status(201).send();
});
router.post('/getPunchs', function(req, res, next) {

  console.log(x);

      res.status(201).send({punch:x});
      x=0;
    });

module.exports = router;
