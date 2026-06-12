const authService = require("../services/authService");

const login=async(req,res)=>{
    try{
        const data =req.body;
        const result=await authService.Login(data);
        res.json({token:result});
    }catch(err){
        res.status(400).json({msg:err.message});
    }   

};


const register=async(req,res)=>{
    try{
        const data =req.body;
        const result=await authService.Register(data);
        res.json({user:result});
    }catch(err){
        res.status(400).json({msg:err.message});
    }   

};

module.exports={login, register};