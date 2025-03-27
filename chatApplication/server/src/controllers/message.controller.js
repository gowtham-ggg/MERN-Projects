import User from "../models/user.modal.js"

export const getUsersForSidebar = async (req, res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id : {$ne:loggedInUserId }}).select("-password")

        res.status(200).json(filteredUsers)


    } catch (error) {
        console.error("Error finding user:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

export const getMessages = async (req, res) =>{
    try {
        const {id: userToChatId} =  req.params
        const myId = req.user._id

        const message = await message.find({
            $or: [
                {senderId: myId, reciverId  : userToChatId},
                {senderId : userToChatId , reciverId : myId}
            ]
        })
        res.status(200).json(message)

    } catch (error) {
        console.error("Error in getti ng message:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

export const sendMessage = async (req, res)=>{
    try {
        const {text, image} = req.body

        const {id: reciverId} = req.params
        const senderId = req.user._id

        let imageUrl ;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
         }

         const newMessage = new Message ({
            senderId,
            reciverId,
            text,
            image : imageUrl
         })

         await newMessage.save()

         //todo real time functionality goes here => socket.io

         res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error in send message:", error.message);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}