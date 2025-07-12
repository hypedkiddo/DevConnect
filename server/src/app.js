import express,{urlencoded} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//Intialize app creating an instance of express application
const app=express()
app.use(cors({
     origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(urlencoded({extended:true,limit:"16kb"}));
 app.use(express.static("public"));
 app.use(cookieParser());

 //User
 import UserRouter from "./routes/user.routes.js"
 app.use("/api/v1/users",UserRouter);




 //Home route
 app.get("/",(req,res)=>{
    res.send("Welcome to my Project");
 })

 export default app;