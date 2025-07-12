import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); 

const generateAcessToken=(userid)=>{
    //Creating a jwt Token
    const token= jwt.sign({id:userid},process.env.JWT_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    });

    return token;
};


//Generate  Refresh Token
const generateRefreshToken=(userid)=>{
    //Creating a jwt Token
    const token= jwt.sign({id:userid},process.env.JWT_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    });

    return token;
};

export default {generateAcessToken,generateRefreshToken};