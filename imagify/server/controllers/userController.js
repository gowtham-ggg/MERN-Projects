import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import razorpay from "razorpay"


const registerUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({sucess: false, message : 'Missing Details'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({sucess : true, token, user: {name : user.name}})

    }
    catch(error){
        console.log(error);
        res.json({sucess: false, message : error.message})
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required." });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User does not exist." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials." });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ success: true, token, user: { name: user.name } });
  
    } catch (error) {
      console.error("Login error:", error);
      res.json({ success: false, message: error.message });
    }
  };
  

const userCredits = async (req, res)=>{
    try{
        const {userId} = req.body

        const user = await userModel.findById(userId);
        res.json({sucess: true, credits : user.creditBalance, user : {name : user.name}})
    }
    catch(error){
        console.log(error);
        res.json({sucess: false, message : error.message})
    }
}


const razorPayInstance = new razorpay({
  key_id : process.env.KEY_ID,
  key_secret : process.env.KEY_SECRET,
});

const paymentRazorpay = async(req, res)=>{
    try{

    }
    catch(error){
      console.log(error)
    }
}



export {registerUser, loginUser, userCredits}