var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Onam2017@Amazon' });
});

router.get('/members', function(req, res, next) {
  res.render('members', { title: 'Members' });
});

//https://docs.google.com/forms/d/19ODwZzPfb_yhcowcRot39lGfulFsh0i-SOfpn6afw14/edit#responses

module.exports = router;
