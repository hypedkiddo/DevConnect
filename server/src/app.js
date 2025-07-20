import express,{urlencoded} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//Intialize app creating an instance of express application
const app=express()
app.use(cors({
     origin:"*", //For now allow request from everywhere
    credentials:true
}))

app.use(express.json());
app.use(urlencoded({extended:true}));
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