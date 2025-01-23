import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Cookies received:", req.cookies);
  console.log("Token received:", token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", tokenDecode);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      console.log("User ID set in req.body:", req.body.userId);
    } else {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export default userAuth;
