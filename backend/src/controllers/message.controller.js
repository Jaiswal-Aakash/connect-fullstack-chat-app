import mongoose from 'mongoose';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getReceiverSocketId } from '../lib/socket.js';
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Get all messages between logged-in user and others
        const messages = await Message.find({
            $and: [
                {
                    $or: [  
                        { senderId: loggedInUserId },
                        { receiverId: loggedInUserId }
                    ]
                },
                {
                    $or: [
                        { text: { $ne: null, $ne: "" } },
                        { image: { $ne: null, $ne: "" } }
                    ]
                }
            ]
        }).sort({ createdAt: -1 });

        // Create a map to track the most recent message timestamp for each user
        const userLastMessageMap = new Map();
        
        messages.forEach(message => {
            const otherUserId = message.senderId.toString() === loggedInUserId.toString() 
                ? message.receiverId.toString() 
                : message.senderId.toString();
            
            if (!userLastMessageMap.has(otherUserId) || 
                message.createdAt > userLastMessageMap.get(otherUserId)) {
                userLastMessageMap.set(otherUserId, message.createdAt);
            }
        });

        // Get unique user IDs
        const chatUserIds = Array.from(userLastMessageMap.keys()).map(id => new mongoose.Types.ObjectId(id));

        // Get users and sort them by their most recent message
        const filteredUsers = await User.find({
            _id: { $in: chatUserIds }
        }).select("-password");

        // Sort users by their most recent message timestamp
        const sortedUsers = filteredUsers.sort((a, b) => {
            const aLastMessage = userLastMessageMap.get(a._id.toString());
            const bLastMessage = userLastMessageMap.get(b._id.toString());
            return bLastMessage - aLastMessage; // Most recent first
        });

        console.log(`Found ${messages.length} messages with content for user ${loggedInUserId}`);
        console.log(`Users with chat history: ${sortedUsers.length}`);

        res.status(200).json(sortedUsers);
    } catch (err) {
        console.log("Error in getUsersForSidebar: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        console.log("getAllUsers function called");
        const loggedInUserId = req.user._id;
        
        // Get all users except the logged-in user
        const allUsers = await User.find({ 
            _id: { $ne: loggedInUserId } 
        }).select("-password");

        console.log(`Found ${allUsers.length} total users`);
        res.status(200).json(allUsers);
    } catch (err) {
        console.log("Error in getAllUsers: ", err.message);
        res.status(500).json({ message: "Internal server error" });
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

