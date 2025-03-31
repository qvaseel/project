import { create } from "zustand";
import { User } from "@/interface";
import useAuthStore from "./authStore";
import { getAuthToken } from "@/utils/auth";
import { api } from "@/api/api";

// const{ decodedUser, token} = useAuthStore();

interface UserStore {
  user: User | null;
  users: User[] | null;
  setUser: () => Promise<boolean>;
  getAllUsers: () => Promise<void>;
  token: string | null;

}

// export const useUserStore = create<UserStore>((set) =>({
//   user: null,
//   users: null,

//   setUser: async () => {
//     const token = getAuthToken();
//     // const token = cookieStore.get('token')?.value;
//     if (token) {
//       const response = await api.get<User>('/user')
//     }
//   }
// }))
