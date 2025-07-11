import prisma from "../db/db.config.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"

const genrateAccessTokenAndRefreshToken=async(userid)=>{
    try{
        const user=await prisma.user.findUnique({
           where:{
            id:userid,
           } ,
        });
        
    }
    catch(error){
        //here we are explicitly throwing an error
        throw new Apierror(500,"Something went wrong while generating access token")
    }
}

//arrow