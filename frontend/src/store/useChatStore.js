import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

function moveUserToTop(users, userId) {
    const idx = users.findIndex(u => u._id === userId);
    if (idx === -1) return users;
    const user = users[idx];
    return [user, ...users.slice(0, idx), ...users.slice(idx + 1)];
}

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getAllUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/all-users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch messages');
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages, users } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ 
                messages: [...messages, res.data],
                users: moveUserToTop(users, selectedUser._id)
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to send message');
            console.log(error);
        }
    },
    deleteMessage: async (messageId) => {
        const { messages } = get();
        console.log("Deleting message with ID:", messageId);

        if (!messageId) {
            toast.error("Message ID is required to delete.");
            return;
        }

        const existingMessage = messages.find((msg) => msg._id === messageId);
        if (!existingMessage) {
            toast.error("Message not found.");
            return;
        }

        try {
            const response = await axiosInstance.delete(`/messages/${messageId}`);

            if (response.status === 200) {
                const updatedMessages = messages.map((msg) =>
                    msg._id === messageId
                        ? { ...msg, text: null, image: null, isDeleted: true }
                        : msg
                );

                set({ messages: updatedMessages });
                toast.success("Message deleted successfully.");
            }
        } catch (error) {
            toast.error(error?.response?.data || "Failed to delete message");
            console.error(error);
        }
    },
    subscribeToNewMessage: () => {
        const { selectedUser, users } = get();
        const socket = useAuthStore.getState().socket;
        
        socket.on("newMessage", (newMessage) => {
            const { authUser } = useAuthStore.getState();
            const isMessageFromOtherUser = newMessage.senderId !== authUser._id;
            
            if (isMessageFromOtherUser) {
                // Move the sender to the top of the users list
                const updatedUsers = moveUserToTop(users, newMessage.senderId);
                set({ users: updatedUsers });
                
                // If the message is from the currently selected user, add it to messages
                if (selectedUser && newMessage.senderId === selectedUser._id) {
                    set({ messages: [...get().messages, newMessage] });
                }
            }
        });
    },
    unsubscribeFromNewMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }, 

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));