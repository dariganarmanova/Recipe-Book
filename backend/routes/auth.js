const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json("User already exists");
        }
        const newUser = new User({ email, password });
        const savedUser = await newUser.save();
        return res.status(201).json({ userId: savedUser._id })
    }
    catch (error) {
        console.error(e);
        return res.status(500).json(err);
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ userId: user._id });
        } else {
            return res.json("User does not exist")
        }
    } catch (error) {
        console.error(e);
        return res.status(500).json(err);
    }
});

module.exports = router;