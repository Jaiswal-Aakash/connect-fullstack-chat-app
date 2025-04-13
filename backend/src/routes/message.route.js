import express from 'express';
import { getMessages, getUsersForSidebar, sendMessage, deleteMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:messageId", protectRoute, deleteMessage);
// router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;