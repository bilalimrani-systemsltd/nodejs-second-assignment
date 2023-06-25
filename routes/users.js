const express = require('express');

const router = express.Router();
const fs = require('fs');
const users = require('../constants/user.json');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send(users);
});

/* POST user. */
router.post('/', (req, res) => {
  users.push(req.body);
  fs.writeFile('./constants/user.json', users, (err) => {
    if (err) throw err;
    console.log('complete');
  });
  res.send(req.body);
});

/* GET user. */
router.get('/user/:id', (req, res) => {
  const data = users.find((item) => item.id === req.params.id);
  res.send(data);
});

/* GET user. */
router.delete('/user/:id', (req, res) => {
  const data = users.findIndex((item) => item.id === req.params.id);
  users.splice(data, 1);
  fs.writeFile('./constants/user.json', JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log('complete');
  });
  res.send(users);
});

module.exports = router;
