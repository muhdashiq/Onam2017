var express = require('express');
var router = express.Router();
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Onam2017@Amazon' });
});

router.get('/members', function(req, res, next) {
  fs.readFile('./data/input.csv', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var dataArray = data.toString().split(/\r?\n/);
    var membersObject = [];
    console.log(dataArray[1]);
    dataArray.forEach(function(v,i){
      if(v !='DUI' && i!=0){
        var str = v.split(",");
        var user = {};
        var mobile = str[4].replace(/^"|"$|^ | $/g, '').trim();
        mobile = mobile.substring(mobile.length-10);
        var amazon = str[3].replace(/^"|"$/g, '');
        var positionOfAt = amazon.indexOf("@");
        amazon = amazon.substring(0,positionOfAt-3) + "**" + amazon.substring(positionOfAt-1);
        user["id"] = i;
        user["name"] = str[2].replace(/^"|"$/g, '');
        user["amazon"] = amazon;
        user["floor"] = str[5].replace(/^"|"$/g, '');
        user["block"] = str[6].replace(/^"|"$/g, '');
        user["mobile"] = mobile.substring(0,3) + "*****" + mobile.substring(8);
        user["memberShip"] = false;
        membersObject.push(user);
      }
    });
    res.render('members', { members: membersObject });
  });
});

//https://docs.google.com/forms/d/19ODwZzPfb_yhcowcRot39lGfulFsh0i-SOfpn6afw14/edit#responses
fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

module.exports = router;
