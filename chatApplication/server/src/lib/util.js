import Jwt from "jsonwebtoken"

export const generateToken =(userId, res)=>{
    const token = Jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //prevent xss attacks cross-site scripting attacks
        samSite: "strict", //CSRF attacks cross site request forgery attacks
        secure : process.env.NODE_ENV != "developement"
    })
    return token
}