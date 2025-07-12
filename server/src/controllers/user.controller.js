import prisma from "../db/db.config.js";
import bcrypt from "bcrypt"
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import {generateAccessToken,generateRefreshToken} from "../utils/generateToken.js"
import { uploadOnCloudinary } from "../utils/cloudinaryconfig.js";

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
        const avatarUrlLocal=await req.files?.avatar[0]?.path;
        if(!avatarUrlLocal){
             throw new Apierror(400,"Avatar file is required or multer error has occured")
        }
        //Upload to cloudinary
        const avatarUrl=await uploadOnCloudinary(avatarUrlLocal);
        //Save to db
        const createduser=await prisma.user.create({
            data:{
                username,
                email,
                password:hashedpassword,
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
       const accessToken=await generateAccessToken(user.id);
       const newrefershToken=await generateRefreshToken(user.id);
       //add refreshToken
       await prisma.user.update(
        {
            where:{id:user.id},
            data:{
                 refreshToken:newrefershToken
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
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    //remove refreshToken
     await prisma.user.update(
        {
            where:{id:userId},
            data:{
               refreshToken:""
            }
        },
       );
    res.status(200).json(new Apiresponse(200,{},"User logged out"));
}
export default {registerUser,loginUser,logoutuser}
