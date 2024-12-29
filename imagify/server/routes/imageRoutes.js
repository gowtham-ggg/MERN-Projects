import express from "express"
import {generateImage} from "../controllers/imageController.js"
import userAuth from "../middleware/auth.js"


const imageRouters = express.Router()

imageRouters.post('/generate-image', userAuth,generateImage)

export default imageRouters