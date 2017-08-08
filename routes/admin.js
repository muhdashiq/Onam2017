var express = require('express');
var router = express.Router();
var fs = require('fs')
var userService = require('../data/userDetails');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Admin page");
  res.render('admin', { authenticationFailed: false});
});

router.post('/', function(req, res, next) {
  var userEmail = req.body.email || null;
  var userPassword = req.body.password || null;
  var authenticated = authenticateAdminUser(userEmail,userPassword,userService.adminUsers);
  if(authenticated){
    fs.readFile('./data/input.csv', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var dataArray = data.toString().split(/\r?\n/);
      var membersObject = [];
      var userSort = [
        [[],[],[],[],[],[],[],[],[],[],[],[],[],[]], //A Block
        [[],[],[],[],[],[],[],[],[],[],[],[],[],[]], //B Block
        [[],[],[],[],[],[],[],[],[],[],[],[],[],[]] //C Block
      ];
      console.log(dataArray[1]);
      dataArray.forEach(function(v,i){
        if(v !='DUI' && i!=0){
          var str = v.split(",");
          var user = {};
          user["id"] = i;
          user["name"] = str[2].replace(/^"|"$/g, '');
          user["amazon"] = str[3].replace(/^"|"$/g, '');
          user["floor"] = str[5].replace(/^"|"$/g, '');
          user["block"] = str[6].replace(/^"|"$/g, '');
          var mobile = str[4].replace(/^"|"$|^ | $/g, '').trim();
          user["mobile"] = mobile.substring(mobile.length-10);
          user["memberShip"] = false;
          //console.log(i + ":" + str[2]);
          switch(user["block"]){
            case "SP Infocity A Block":
              switch(user["floor"]){
                case "First Floor":
                  userSort[0][1].push(user);
                break;
                case "Second Floor":
                  userSort[0][2].push(user);
                break;
                case "Third Floor":
                  userSort[0][3].push(user);
                break;
                case "Fourth Floor":
                  userSort[0][4].push(user);
                break;
                case "Fifth Floor":
                  userSort[0][5].push(user);
                break;
                case "Sixth Floor":
                  userSort[0][6].push(user);
                break;
                case "Seventh Floor":
                  userSort[0][7].push(user);
                break;
                case "Eight Floor":
                  userSort[0][8].push(user);
                break;
                case "Ninth Floor":
                  userSort[0][9].push(user);
                break;
                case "Tenth Floor":
                  userSort[0][10].push(user);
                break;
                case "Levant Floor":
                case "Eleventh Floor":
                  userSort[0][11].push(user);
                break;
                case "Twelfth Floor":
                  userSort[0][12].push(user);
                break;
                case "Thirteenth Floor":
                  userSort[0][13].push(user);
                break;
                default:
                  userSort[0][0].push(user);
              }
            break;
            case "SP Infocity B Block":
            switch(user["floor"]){
              case "First Floor":
                userSort[1][1].push(user);
              break;
              case "Second Floor":
                userSort[1][2].push(user);
              break;
              case "Third Floor":
                userSort[1][3].push(user);
              break;
              case "Fourth Floor":
                userSort[1][4].push(user);
              break;
              case "Fifth Floor":
                userSort[1][5].push(user);
              break;
              case "Sixth Floor":
                userSort[1][6].push(user);
              break;
              case "Seventh Floor":
                userSort[1][7].push(user);
              break;
              case "Eight Floor":
                userSort[1][8].push(user);
              break;
              case "Ninth Floor":
                userSort[1][9].push(user);
              break;
              case "Tenth Floor":
                userSort[1][10].push(user);
              break;
              case "Levant Floor":
              case "Eleventh Floor":
                userSort[1][11].push(user);
              break;
              case "Twelfth Floor":
                userSort[1][12].push(user);
              break;
              case "Thirteenth Floor":
                userSort[1][13].push(user);
              break;
              default:
                userSort[1][0].push(user);
            }
            break;
            case "SP Infocity C Block":
            switch(user["floor"]){
              case "First Floor":
                userSort[2][1].push(user);
              break;
              case "Second Floor":
                userSort[2][2].push(user);
              break;
              case "Third Floor":
                userSort[2][3].push(user);
              break;
              case "Fourth Floor":
                userSort[2][4].push(user);
              break;
              case "Fifth Floor":
                userSort[2][5].push(user);
              break;
              case "Sixth Floor":
                userSort[2][6].push(user);
              break;
              case "Seventh Floor":
                userSort[2][7].push(user);
              break;
              case "Eight Floor":
                userSort[2][8].push(user);
              break;
              case "Ninth Floor":
                userSort[2][9].push(user);
              break;
              case "Tenth Floor":
                userSort[2][10].push(user);
              break;
              case "Levant Floor":
              case "Eleventh Floor":
                userSort[2][11].push(user);
              break;
              case "Twelfth Floor":
                userSort[2][12].push(user);
              break;
              case "Thirteenth Floor":
                userSort[2][13].push(user);
              break;
              default:
                userSort[2][0].push(user);
            }
            break;
          }
        }
      });
      for(var blockIndex in userSort){
        for(var floorIndex in userSort[blockIndex]){
          for(var memberIndex in userSort[blockIndex][floorIndex]){
            (userSort[blockIndex][floorIndex][memberIndex])["id"]="#";
            membersObject.push(userSort[blockIndex][floorIndex][memberIndex])
          }
        }
      }

      res.render('members', { members: membersObject, isAdmin: true });
    });
  } else {
    res.render('admin', { authenticationFailed: true});
  }
});

function authenticateAdminUser(username,password,adminUsers){
  for(var userIndex in userService.adminUsers){
    admin = userService.adminUsers[userIndex];
    if(admin.username === username){
      if(admin.password === password || admin.isActive === true){
        return true;
      } else {
        return false;
      }
    }
  }
  console.log("user not found");
  return false;
}


module.exports = router;
