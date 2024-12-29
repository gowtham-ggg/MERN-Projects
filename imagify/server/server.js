import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouters from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()


app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user',userRouter)
app.use('/api/image',imageRouters)
app.get('/', (req, res)=> res.send("API WORKING FINE"))

app.listen(PORT, ()=>{
    console.log("server running on port : " + PORT);
})