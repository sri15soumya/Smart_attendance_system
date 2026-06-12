const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const Login=async(data)=>{
    const {email,password}=data;
    const user =await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    const token= jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    },process.env.JWT_SECRET,{
        expiresIn:"1h"
    })
    return token;

};

const Register=async(data)=>{
    const {name,email,password,role}=data;
    const existing =await User.findOne({email});
    if(existing){
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new  User({
        name,
        email,
        password:hashedPassword,    
        role
    });
     await user.save();

    return user;


}

module.exports={Login, Register};
