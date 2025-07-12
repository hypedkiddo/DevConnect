import prisma from "../db/db.config.js";
import bcrypt from "bcrypt"
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import {generateAcessToken,generateRefreshToken} from "../utils/generateToken.js"

//Registeruser
const registerUser=async(req,res)=>{
    const {username,email,password,bio}=req.body
    try {
        //Check if user exists
        const user=await prisma.user.findUnique({where:{email}})
        if(user){
            return res.status(400).json({error:"User already exists"});
        }
        //hash password
        const hashedpassword= await bcrypt.hash(password,10);
        //Save to db
        const createduser=await prisma.user.create({
            data:{
                username,
                email,
                hashedpassword,
                bio,
                avatarUrl
            },
        });
        //send response
        res.status(201).json(new Apiresponse(200,createduser,"User created successfully"));
        //After Succesfull signup user will be redirected to login page where we will generate access and refresh token
    } catch (error) {
        throw new Apierror(500,"Something went wrong while registering the user")   
    }
}
//login user
const loginUser=async(req,res)=>{
    const {email,password} =req.body;
    try {
        //Is valid user
        const user=await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            return res.status(400).json({error:"Invalid user credentials"})
        }
        //compare password
        const isCorrect=await bcrypt.compare(password,user.password);
        if(!isCorrect){
             return res.status(400).json({error:"Invalid user credentials"})
        }
       const accessToken=await generateAcessToken(user.id);
       const newrefershToken=await generateRefreshToken(user.id);
       //add refreshToken
       await prisma.user.update(
        {
            where:{id:user.id},
            data:{
                refershToken:newrefershToken
            }
        },
       );
        //All good
        res.status(200).json(new Apiresponse(200,{user,accessToken},"User logged in successfully"))
    } catch (error) {
         throw new Apierror(500,"Something went wrong while Logging") 
    }
}
//logout user
const logoutuser=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{id}
    })
    //remove refreshToken
     await prisma.user.update(
        {
            where:{id:user.id},
            data:{
                refershToken:""
            }
        },
       );
    res.status(200).json(new Apiresponse(200,{},"User logged out"));
}
export default {registerUser,loginUser,logoutuser}
