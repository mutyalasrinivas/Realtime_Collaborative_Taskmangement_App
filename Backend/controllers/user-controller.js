const User =require('../models/user.js');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken')

const signup=async(req,res)=>{

  try{
    const {name,email,password} =req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Missing required field(s)');
        }
     const existingUser= await User.findOne({email})
     if(existingUser){
        return res.status(201).send({message:"user already existed,please login.."});
     }   

    const saltrounds=10;
    bcrypt.hash(password,saltrounds,async (error,hash)=>{
      let user;
      user= new User ({
         name,
         email,
         password:hash,

     })
     if(error){
      console.error(error)
     }
     await user.save();
    res.status(200).json({user,message:"user signup successful"});

    })
  }catch(err){
    console.log(err);
    res.status(500).send("Error occurred while posting to database");
  }
}

   
const generateAccessToken=(id, name,isAdmin)=>{
     return jwt.sign({userId:id,name:name,isAdmin},process.env.SECRET_KEY)
}

const login=async(req,res,next)=>{
     
    try{
          
         const {email,password} = req.body;
         //find user in db
         let user = await User.findOne({email});
         if(user){
           bcrypt.compare(password,user.password,function(err,result){
                if(err){
                     console.error(err)
                 }
                if(result === true){
                     res.status(200).json({success:true,message:"user logged in succesfully",token:generateAccessToken(user.id,user.name,user.isAdmin)})
                }
                else{
                     return res.status(401).json({success:false,message:'password is incorrect'})
                }
           })
             
      }else{
           return res.status(404).json({success:false,message:"user does not exit"})
      } 
    }catch(err){
         console.log("login controller function error",err)
    }
 }


 module.exports={signup,login,generateAccessToken}