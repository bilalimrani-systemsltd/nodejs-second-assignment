var express = require('express');
var router = express.Router();
const fs = require('fs');
const users = require('../constants/user.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

/* POST user. */
router.post('/', function(req, res, next) {
  users.push(req.body)
  fs.writeFile("./constants/user.json", users, function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );
  res.send(req.body);
});

/* GET user. */
router.get('/user/:id', function(req, res, next) {
  const data = users.find(item => item.id == req.params.id);
  res.send(data);
});

/* GET user. */
router.delete('/user/:id', function(req, res, next) {
  const data = users.findIndex(item => item.id == req.params.id);
  users.splice(data, 1);
  fs.writeFile("./constants/user.json", JSON.stringify(users), function(err) {
    if (err) throw err;
    console.log('complete');
    }
  );
  res.send(users);
});

module.exports = router;
