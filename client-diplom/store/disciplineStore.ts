import { create } from 'zustand';
import { api } from '@/api/api';
import { Discipline } from '@/interface/index';

interface DisciplineState {
  disciplines: Discipline[];
  fetchDisciplines: () => Promise<void>;
  fetchDisciplinesOfTeacher: (teacherId: number) => Promise<void>;
  createDiscipline: (discipline: Partial<Discipline>) => Promise<void>;
  updateDiscipline: (id: number, discipline: Partial<Discipline>) => Promise<void>;
  deleteDiscipline: (id: number) => Promise<void>;
}

export const useDisciplineStore = create<DisciplineState>((set) => ({
  disciplines: [],

  fetchDisciplines: async () => {
    const { data } = await api.get<Discipline[]>('/disciplines');
    set({ disciplines: data });
  },

  fetchDisciplinesOfTeacher: async (teacherId) => {
    const { data } = await api.get<Discipline[]>(`/disciplines/by-teacher?teacherId=${teacherId}`);
    set({ disciplines: data });
  },

  createDiscipline: async (discipline) => {
    await api.post('/disciplines', discipline);
  },

  updateDiscipline: async (id, discipline) => {
    await api.put(`/disciplines/${id}`, discipline);
  },

  deleteDiscipline: async (id) => {
    await api.delete(`/disciplines/${id}`);
  },
}));
