const express = require('express');
const {loginUser, registerUser, getMe} = require("../services/userServices");
const {verifyToken} = require("./authMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})
router.post('/register', registerUser)
router.post('/login', loginUser);
router.get("/getMe",verifyToken, getMe)

module.exports = router;