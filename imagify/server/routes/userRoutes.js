import express from "express"
import {registerUser, loginUser, userCredits, paymentRazorpay} from "../controllers/userController.js"
import userAuth from "../middleware/auth.js"
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth,userCredits)
userRouter.post('/pay-razor', userAuth,paymentRazorpay)

export default userRouter

//http://localhost:4000/api/user/register 
//localhost:400/api/user/login