const express =require('express');
const mongoose= require ('mongoose');
const dotenv =require('dotenv');
const cors =require('cors');
const bodyParser=require("body-parser");
const userRouter =require('./routers/user-router.js');
const app=express();
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use(userRouter);



mongoose.connect(`mongodb+srv://srinivas:${process.env.MONGODB_PASSWORD}@cluster0.1qlzl0i.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{app.listen(process.env.PORT,()=>console.log(`server running on ${process.env.PORT} connected to database`))});
 