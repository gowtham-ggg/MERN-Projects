import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser  from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoute.js"

const app = express()
const port = process.env.PORT || 8000

//connect database

connectDB()

//middleware

app.use(express.json())
app.use(cors({credentials : true}))
app.use(cookieParser())

//API end points
app.get('/',(req, res)=>{
    res.send("API WORKING")
})

app.use('/api/auth',authRouter)





app.listen(port, ()=>{
    console.log(`server started on the port : ${port}`)
})