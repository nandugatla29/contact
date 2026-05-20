const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
exports.signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({name,email,password:hashedPassword});
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({
            success:true,
            message:"Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}