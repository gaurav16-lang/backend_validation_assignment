const express =require('express');
const User = require('../model/user.model');
const {body,validationResult} = require("express-validator");

const router = express.Router();


// router.post("/",body("id").isLength({min:1}).withMessage("id is required"),body("first_name").isLength({min:1}).withMessage("id is required"),body("last_name").isLength({min:1}).withMessage("id is required"),body("email").isEmail().withMessage("id is required"),body("pincode").isLength({min:1}).withMessage("id is required"),body("gender").isLength({min:3}).withMessage("id is required"),body("age").isLength({min:2}).withMessage("id is required"),async(req,res)=>{

//     const errors = validationResult(req);
//     if(!errors.isEmpty())
//     {
//         return res.status(400).json({data:errors.array()})
//     }
//     const user = await User.create(req.body);
//     return res.status(201).json({data:user})
// })

// module.exports = router;



router.post(
    "/",
    body("first_name").exists()
   
      .withMessage(
        "first name is require"
      ),
      body("last_name").exists().withMessage("Last name is require"),
    // body("price").custom((value) => {
    //   // value = 1900
    //   const isNumber = /^[0-9]*$/.test(value); // true or false
    //   if (!isNumber || value <= 0) {
    //     throw new Error("Price cannot be 0 or negative");
    //   }
    //   return true;
    // }),
    body("email").exists().isEmail().withMessage("Email should be valid"),
    body("pincode").isLength({max:6,min:6}).withMessage("must be 6 length"),
    body("age").isInt({max:100,min:1}).withMessage("write a valid age"),
    body("gender").exists().custom(async(value)=>{
       var array = ["Male","Female","other"];
       var t = array.includes(value);
       if(!t)
       {
           throw new Error("please write valid gender");

       }
       return true;
    }),
    // body("email").custom(async (value) => {
    //   // value = a@a.com
    //   const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    //   if (!isEmail) {
    //     throw new Error("Please enter a proper email address");
    //   }
    //   const productByEmail = await Product.findOne({ email: value })
    //     .lean()
    //     .exec();
    //   if (productByEmail) {
    //     throw new Error("Please try with a different email address");
    //   }
    //   return true;
    // }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param, location }) => {
          return {
            [param]: msg,
          };
        });
        return res.status(400).json({ errors: newErrors });
      }
      try {
        const user = await User.create(req.body);
  
        return res.status(201).json({ user });
      } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
      }
    }
  );
  
  module.exports = router;