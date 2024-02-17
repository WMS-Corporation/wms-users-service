const express = require('express');
const {loginUser} = require("../services/userServices");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})
router.post('/login', loginUser);

module.exports = router;