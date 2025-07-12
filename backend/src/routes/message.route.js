import express from 'express';
import { getMessages, getUsersForSidebar, getAllUsers, sendMessage, deleteMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Debug middleware to log all requests
router.use((req, res, next) => {
    console.log(`Message route accessed: ${req.method} ${req.path}`);
    next();
});

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/all-users", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:messageId", protectRoute, deleteMessage);
// router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;