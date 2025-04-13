import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';


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
            console.log("fetched", res.data);
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
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
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
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage], })
        });
    },
    unsubscribeFromNewMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }, 

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));