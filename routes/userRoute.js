const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library'); 

// Login route
const client = new OAuth2Client('194348839374-nqf4r2gqu6lh21d5sv0hu3gn85pj5trp.apps.googleusercontent.com');
router.post('/login', async function(req, res) {
    try {
        const result = await User.findOne({ email: req.body.email, password: req.body.password });
        if (result) {
            res.send(result);
        } else {
            res.status(500).json('Error');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Register route
router.post('/register', async function(req, res) {
    try {
        const newuser = new User(req.body);
        await newuser.save();
        res.send('User registered successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});

// Google login/register route
router.post('/google-login', async function(req, res) {
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: '194348839374-nqf4r2gqu6lh21d5sv0hu3gn85pj5trp.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const { sub, name, email } = payload;
        let user = await User.findOne({ email });
        if (user) {
            if (user.googleId === sub) {
                res.send(user);
            } else {
                res.status(401).json('Google login failed');
            }
        } else {
            const newUser = new User({ name, email, googleId: sub });
            await newUser.save();
            res.send(newUser);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Logout route (dummy)
router.post('/logout', function(req, res) {
    // Any server-side cleanup (if needed)
    res.send('Logout successful');
});

module.exports = router;
