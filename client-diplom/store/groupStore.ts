import { create } from 'zustand';
import { api } from '@/api/api';
import { Group } from '@/interface/index';

interface GroupState {
  groups: Group[];
  fetchGroups: () => Promise<void>;
  createGroup: (group: Partial<Group>) => Promise<void>;
  updateGroup: (id: number, group: Partial<Group>) => Promise<void>;
  deleteGroup: (id: number) => Promise<void>;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],

  fetchGroups: async () => {
    const { data } = await api.get<Group[]>('/groups');
    set({ groups: data });
  },

  createGroup: async (group) => {
    await api.post('/groups', group);
  },

  updateGroup: async (id, group) => {
    await api.put(`/groups/${id}`, group);
  },

  deleteGroup: async (id) => {
    await api.delete(`/groups/${id}`);
  },
}));
