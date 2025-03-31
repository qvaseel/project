import { create } from 'zustand';
import axios from 'axios';
import { Schedule } from '@/interface/index';
import { api } from '@/api/api';

interface ScheduleState {
  schedule: Schedule[];
  loading: boolean;
  error: string | null;
  fetchSchedule: (groupId: number) => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  schedule: [],
  loading: false,
  error: null,

  fetchSchedule: async (groupId) => {
    set({ loading: true, error: null });

    try {
      const response = await api.get(`/schedule?groupId=${groupId}`);
      set({ schedule: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка при загрузке расписания',
        loading: false,
      });
    }
  },
}));
