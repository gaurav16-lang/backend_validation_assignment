const mongoose =require("mongoose");


const userSchema = new mongoose.Schema({

  
    first_name:String,
    last_name:String,
    email:String,
    pincode:Number,
    age:Number,
    gender:String,
   
   
},{
    versionKey:false,
    timestamps:true
})

const User = mongoose.model("user",userSchema);

module.exports=User;