import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/api/api";
import { DecodedUser, User } from "@/interface";
import { jwtDecode } from "jwt-decode";
import { removeAuthToken, setAuthToken } from "@/utils/auth";

interface AuthState {
    isAuthenticated: boolean;
    decodedUser: DecodedUser | null;
    profileUser: User | null;
    setDecodedUser: (decodedUser: DecodedUser | null) => void;
    setProfileUser: (id: number) => Promise<void>;
    token: string | null;
    setToken: (token: string | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
  }
  

  const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        decodedUser: null,
        token: null,
        profileUser: null,
  
        setToken: (token) => {
          set({ token, isAuthenticated: !!token });
  
          if (token) {
            setAuthToken(token);
            const decoded = jwtDecode<DecodedUser>(token);
            set({ decodedUser: decoded });
  
            get().setProfileUser(decoded.id);
          } else {
            set({ decodedUser: null, profileUser: null });
          }
        },
        setDecodedUser: (decodedUser) => set({ decodedUser }),
        setProfileUser: async (id: number) => {
          try {
            const response = await api.get(`/users/${id}`, {
              headers: { Authorization: `Bearer ${get().token}` },
            });
            set({ profileUser: response.data });
          } catch (error) {
            console.error("Ошибка при загрузке профиля");
          }
        },
  
        login: async (email, password) => {
          try {
            const response = await api.post("/auth/login", { email, password });
  
            if (response.data?.token) {
              get().setToken(response.data.token);
              return true;
            }
  
            return false;
          } catch (error) {
            console.error("Ошибка при входе:", error);
            return false;
          }
        },
  
        logout: () => {
          
            removeAuthToken();
            set({ token: null, decodedUser: null, isAuthenticated: false, profileUser: null });
            localStorage.removeItem('auth-storage')
          },
      }),
      
      {
        name: "auth-storage"
      }
    )
  );

// const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   decodedUser: null,
//   token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
//   profileUser: null,

//   setToken: (token) => {
//     set({ token, isAuthenticated: !!token });

//     if (token) {
//       const decoded = jwtDecode<DecodedUser>(token);
//       set({ decodedUser: decoded });
//       useAuthStore.getState().setProfileUser(decoded.id); // Загружаем профиль при авторизации
//     } else {
//       set({ decodedUser: null, profileUser: null });
//     }
//   },

//   setDecodedUser: (decodedUser) => set({ decodedUser }),

//   login: async (email, password) => {
//     try {
//       const response = await api.post("/auth/login", { email, password });

//       if (response.data?.token) {
//         useAuthStore.getState().setToken(response.data.token);
//         setAuthToken(response.data.token);
//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error("Ошибка при входе:", error);
//       return false;
//     }
//   },

//   setProfileUser: async (id: number) => {
//     try {
//       const response = await api.get(`/users/${id}`, {
//         headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
//       });
//       set({ profileUser: response.data });
//     } catch (error) {
//       console.log("Ошибка при загрузке профиля");
//     }
//   },

//   logout: async () => {
//     set({ token: null, decodedUser: null, isAuthenticated: false });
//   },
// }));

if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      useAuthStore.getState().setToken(token);
    }
  }

export default useAuthStore;
