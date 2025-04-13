import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5001' : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isUpdatingProfileInfo: false,
  isEditingProfileBio: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data })
      get().connectSocket();
    } catch (e) {
      console.log(e, 'error checking auth')
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data })
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data })
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully")
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log('error updating profile', error)
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateProfileInfo: async (data) => {
    set({ isUpdatingProfileInfo: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile-info", data);
      set({ authUser: res.data });
      toast.success("Profile info updated successfully")
    } catch (error) {
      console.log('error updating profile info', error)
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfileInfo: false });
    }
  },

  editingProfileBio: async (data) => {
    set({ isEditingProfileBio: true });
    try {
      const res = await axiosInstance.put("/auth/update-bio", data);
      set({ authUser: res.data });
      toast.success("Bio updated successfully")
      
    } catch (error) {
      console.log('error updating bio', error)
      toast.error(error.response.data.message);
    } finally {
      set({ isEditingProfileBio: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL,{
      query: {
        userId: authUser._id,
      },
    });
    socket.connect()
    set({ socket: socket });
    
    socket.on('userConnected', (userIds) => {
      set({ onlineUsers: userIds });
      console.log('user connected', userIds)
    });
  },
  disconnectSocket: () => {
    if (get().socket?.disconnect())get().socket.disconnect();
    set({ socket: null });
  },
}));




