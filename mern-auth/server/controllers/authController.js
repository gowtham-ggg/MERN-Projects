import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import transporter from "../config/nodeMailer.js"


export const register = async (req, res)=>{

    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.json({success : false, message : "All fields are required"})

    }
    try {

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.json({success : false, message :  "User Already Exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({name, email, password:hashedPassword})
        await user.save()
        
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        //sending welcom email

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : "Vanakam da maplaa!",
            text : `Welcome, Your account has been created with email id ${email}`
        }

        await transporter.sendMail(mailOptions)
        return res.json({success: true})

    } catch (error) {
        res.json({success : false, message : error.message})
    }
}


export const login = async (req, res) =>{

    const {email, password} = req.body

    if(!email || !password){
        return res.json({success : false , message : "Email and Password are required"})
    }

    try {

        const user = await userModel.findOne({email})

        if(!user){
            res.json({success : false , message : "Invalid Email"})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            return res.json({success : false , message : "Invalid password"})
        }
        
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        
        return res.json({success: true})
        
        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

export const logout = async (req, res)=>{
    try {

        res.clearCookie('token', {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
           
        })

        return res.json({success : true, message : 'Logged Out'})
        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

//send verification to the users email
export const sendVerifyOtp = async (req, res)=>{
    try {

        const {userId} = req.body

        const user = await userModel.findById(userId)

        if(user.isAccountVerified){
            return res.json({success : false, message : "Account Already verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000) )

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const mailOption = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Account Verification OTP!",
            text : `Yout OTP is  ${otp}. verify your account using this OTP`
        }
        await transporter.sendMail(mailOption)

        res.json({success :  true, message : 'Verification OTP sent on EMail'})

        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

export const verifyEmail = async (req, res)=>{
    
    const {userId, otp} = req.body

    if(!userId || !otp){
        return res.json({success : false, message : "Missing Details"})
    }

    try {

        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success : false, message : "User not found"})
        }

        if(user.email){
            
        }
        
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}