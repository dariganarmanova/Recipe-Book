const express = require('express');
const { UserModel } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For hashing passwords
const router = express.Router();

router.post('/signin', async (req, res) => {
    UserModel.create(req.body)
        .then(User => res.json(User))
        .catch(error => res.json(error))
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("Password is incorrect")
                }
            } else {
                res.json("No record found")
            }
        })
});

module.exports = router;