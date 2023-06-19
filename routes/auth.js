const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const users = require('../constants/user.json')

/* GET home page. */
router.post('/login', function(req, res, next) {
    const { email } = req.body;
    const user = users.find(item => item.email == email);

    if(user) {
        const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
        );

        // save user token
        user.token = token;
        res.send(user);

    } else {
        res.send('user not found');
    }
});

module.exports = router;
