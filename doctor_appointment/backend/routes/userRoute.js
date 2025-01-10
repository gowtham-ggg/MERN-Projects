import express from "express"
import { registerUser,loginUser, getProfile, updateProfile,bookAppointment, listAppointment ,cancellAppointment, paymentRazorPay, verifyRazorPay} from "../controllers/userController.js"
import authUser from "../middleware/authUser.js"
import upload from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'), authUser,updateProfile)
userRouter.post('/book-appointment', authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancellAppointment)
userRouter.post('/payment-razorpay',authUser, paymentRazorPay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorPay)


export default userRouter