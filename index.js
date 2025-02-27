require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors=require("cors");
const app=express()
const User=require("./models/user.model")
PORT=process.env.PORT || 4000;
const dbURL=process.env.MONGO_URL;

mongoose.connect(dbURL)
.then(()=>{
  console.log("MongoDB Atlas is connected.")
})
.catch((error)=>{
  console.log("error.message")
  process.exit(1);
})

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/./views/index.html")
});
app.post("/register",async(req,res)=>{
  try {
    
    bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
      const newUser=new User({
        email:req.body.email,
        password:hash
      })
      await newUser.save()
      res.status(200).json({newUser})
  });
   
 
  } catch (error) {
    res.status(400).json(error.message)
  }
  
  })

app.post("/login",async(req,res)=>{
 
  try {
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({email:email})
  if(user){
    bcrypt.compare(password, user.password, function(err, result) {
      if(result === true){
        res.status(200).json({message:"Original user"})
      }
  });
    
  }else{
    res.status(405).json({message:"Fake user"})
  }
  } catch (error) {
    console.log(error.message)
  }
});
app.use((req,res,next)=>{
  res.status(400).json({
   message:"Router  is not found." 
  })
});
app.use((err,req,res,next)=>{
  res.status(500).json({
   message:"Something broke." 
  })
});

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})
