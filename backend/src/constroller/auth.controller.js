const { model } = require("mongoose");
const bcrypt=require("bcryptjs")
const userModel=require("../models/user_modal.js")
const jwttoken=require("jsonwebtoken")
const token_blacklist=require('../models/blacklist.model.js')
/**
 * @name registerUserController
 * @description register a new user ,expect username ,email and password in the required 
 * @access public 
 */
async function  registerUserController(req,res){
    const {name,email,password }=req.body; 
    if( !name ||!email || !password){
        return res.status(400).json({
            message :"please provde username ,email and password"
        })
    }
    const isUserAlreaduExists=await userModel.findOne({
        $or:[{name},{email}]
    })
    if(isUserAlreaduExists){
        return res.status(400).json({
            message: "account already exist "
        })
    }
    const hash =await bcrypt.hash(password,10);
    const user= await userModel.create({
        name ,
        email ,
        password:hash
    })
    const token=jwttoken.sign({id : user._id ,
        name :user.name ,
        email:user.email


    }, process.env.JWT_TOKEN,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(201).json({
        message :"user register successfully "
        ,user:{
            id :user._id ,
            name :user.name ,
            email :user.email
        }
        
    })
} 
/**
 * @name loginUserController
 * @descriptionlogin a user , expect email and passsword in he request body
 * @access public
 */  
async function loginUserController(req,res){
    const {email , password}=req.body ; 
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"invalid email or password "

        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password )
    if(!isPasswordValid){
        return res.status(400).json({
            message : "invalide  email or password "
        })
    }
    const token=jwttoken.sign({id : user._id ,
        name :user.name 
        ,email:user.email


    }, process.env.JWT_TOKEN,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(201).json({
        message:"login successfully ",
        user:{
            id: user._id,
            name:user.name,
            email :user.email 

            
        }
    })



}
/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist 
 *  @access public
 */
async function logoutUserController(req,res){
    const token=req.cookies.token;
    if(token) {
        await token_blacklist.create({token})

    }
    res.clearCookie("token")
    res.status(201).json({
        message:"logout successfully "
    })
}
/**
 * @name getMeController
 * @description get the current logged innuser detail
 * @access private
 */


async function getMeController(req,res){
    res.status(200).json({
        message:"user detail fetch successfully ",
        user:{
            id:user._id,
            username:user.username,
            email:user.email

        }
    })
    const user =await userModel.findById(req.user.id)
}
module.exports={registerUserController,loginUserController,logoutUserController,getMeController}