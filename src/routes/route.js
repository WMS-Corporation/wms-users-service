const express = require('express');
const {loginUser, registerUser, getMe, getAll, getUserByCode, updateUserPasswordByCode, updateUsernameByCode,
    deleteUserByCode
} = require("../services/userServices");
const {verifyToken} = require("./authMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})
router.post('/register', registerUser)
router.post('/login', loginUser);
router.get("/me", verifyToken, getMe)
router.get("/all", getAll)
router.get("/:codUser", getUserByCode)
router.put("/:codUser", updateUsernameByCode)
router.put("/password/:codUser", updateUserPasswordByCode)
router.delete("/:codUser", deleteUserByCode)

module.exports = router;