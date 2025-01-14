import asyncHandler from 'express-async-handler'

const authUser = asyncHandler ( async (req, res) => {
    res.status(200).json({ success: true, message: 'Auth user' });
});

const registerUser = asyncHandler ( async (req, res) => {
    res.status(200).json({ success: true, message: 'Register user' });
});

const LogoutUser = asyncHandler ( async (req, res) => {
    res.status(200).json({ success: true, message: 'Logout User' });
});

const  getUserProfile = asyncHandler ( async (req, res) => {
    res.status(200).json({ success: true, message: 'User profile' });
});

const updateUserProfile = asyncHandler ( async (req, res) => {
    res.status(200).json({ success: true, message: 'updated' });
});

export { authUser, registerUser,LogoutUser, getUserProfile, updateUserProfile }; 
