import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { apiBaseUrl } from "../utils/api";

interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  uploadProfilePic: (file: File) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      
      setToken: (token) => set({ token }),
      
      setUser: (user) => set({ user }),
      
      logout: () => set({ token: null, user: null }),
      
      uploadProfilePic: async (file) => {
        const { token, user } = get();
        if (!token || !user) {
          console.error("No authentication token or user found.");
          return;
        }
        
        const formData = new FormData();
        formData.append("image", file);
        
        try {
          const response = await axios.post(`${apiBaseUrl}/upload/${user.id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          
          console.log("Profile picture uploaded:", response.data);
          
          // Update the user's profile picture in the store
          set((state) => ({
            user: { ...state.user!, profile_pic: response.data.url },
          }));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Upload failed:", error.response?.data?.error || error.message);
          } else {
            console.error("Upload failed:", error);
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
); 