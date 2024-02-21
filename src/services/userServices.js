
const bcrypt = require("bcryptjs");
const {createUserFromData} = require("../factories/userFactory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {findUserByUsername} = require("../repositories/userRepository");

const loginUser= asyncHandler(async(req, res) =>{
    const {username, password}=req.body;
    console.log(username,", ", password)
    try{
        const userData= await findUserByUsername(username);
        if(userData){
            const crypt = await bcrypt.compare(password, userData?.Password)
            if(crypt){
                const user= createUserFromData(userData);
                user.token=generateToken(user.codUser);
                return res.status(200).json({ message: 'Login successful', user });
            }else{
                return res.status(401).json({ message: 'Invalid email or password' });

            }
        }
        else{
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    }catch(error){
        res.status(500).json({ message:"Internal server error"});
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports={loginUser, generateToken}