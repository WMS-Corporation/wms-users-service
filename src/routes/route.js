const express = require('express');
const {loginUser, registerUser, getMe, getAll, getUserByCode, updateUserPasswordByCode, updateUsernameByCode,
    deleteUserByCode
} = require("../services/userServices");
const {verifyToken} = require("./authMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('OK');
})
router.post('/register', registerUser)
router.post('/login', loginUser);
router.get("/me", verifyToken, getMe)
router.get("/all", verifyToken, getAll)
router.get("/:codUser", verifyToken, getUserByCode)
router.put("/:codUser", verifyToken, updateUsernameByCode)
router.put("/password/:codUser", verifyToken, updateUserPasswordByCode)
router.delete("/:codUser", verifyToken, deleteUserByCode)

module.exports = router;