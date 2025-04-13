import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getReceiverSocketId } from '../lib/socket.js';
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log("Error in getUsserForSidebar: ", err.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })        
        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessages controller: ", err.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();

        //todo: realtime message sending using socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } 
        
        res.status(201).json( newMessage );
    } catch (err) {
        console.log("Error in sendMessage controller: ", err.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) return res.status(404).send("Message not found");

        const isSender = message.senderId.toString() === req.user.id;
        const timeDiff = (Date.now() - new Date(message.createdAt).getTime()) / 1000;

        if (!isSender || timeDiff > 60) {
            return res.status(403).send("Can't delete after 1 minute");
        }

        const updateResult = await Message.updateMany(
            {
                _id: req.params.messageId,
                $or: [{ senderId: req.user.id }, { receiverId: req.user.id }],
            },
            { $set: { text: null, image: null, isDeleted: true } }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).send("Message not found for the user");
        }

        res.status(200).send("Message marked as deleted for both users");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

