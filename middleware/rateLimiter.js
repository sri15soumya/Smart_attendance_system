// to prevent brutforce attacks 
const rateLimit=require("express-rate-limit")

const rateLimiter=rateLimit({
    windowMS:15*60*1000,
    max:100,
    message:{
        msg:"Too many requests.Try again later"
    }
});

module.exports={rateLimiter};