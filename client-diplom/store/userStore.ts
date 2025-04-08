import { create } from 'zustand';
import { api } from '@/api/api';
import { User } from '@/interface/index';
import { getAuthToken } from '@/utils/auth';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  fetchStudentsByGroup: (groupId: number) => Promise<void>;
  fetchTeachers: () => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    const token = getAuthToken();
    try {
      const { data } = await api.get<User[]>('/users/get/students',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ users: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStudentsByGroup: async (groupId: number) => {
    set({ loading: true, error: null });
    const token = getAuthToken();
    try {
      const { data } = await api.get<User[]>(`/users/get/students/${groupId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ users: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTeachers: async () => {
    set({ loading: true, error: null });
    const token = getAuthToken();
    try {
      const { data } = await api.get<User[]>('/users/get/teachers',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ users: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (user) => {
    try {
      await api.post('/users', user);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateUser: async (id, user) => {
    try {
      await api.put(`/users/${id}`, user);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
