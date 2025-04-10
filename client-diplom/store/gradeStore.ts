import { create } from 'zustand';
import { api } from '@/api/api';
import { CreateGradeDto, Grade } from '@/interface';

interface GradeStore {
  grades: Grade[];
  loadAllGradeByStudent: (studentId: number, disciplineId: number) => Promise<void>;
  loadAllGradeByGroup: (groupId: number, disciplineId: number) => Promise<void>;
  loadGradesByLessonId: (lessonId: number) => Grade[];
  findGradeByStudentAndLesson: (studentId: number, lessonId: number) => Grade | undefined;
  createGrade: (grade: Partial<CreateGradeDto>) => Promise<void>;
  updateGrade: (id: number, grade: Partial<Grade>) => Promise<void>;
}

export const useGradeStore = create<GradeStore>((set, get) => ({
  grades: [],

  loadAllGradeByStudent: async (studentId, disciplineId) => {
    const res = await api.get<Grade[]>(`/grades/by-student?studentId=${studentId}&disciplineId=${disciplineId}`);
    set({ grades: res.data });
  },

  loadAllGradeByGroup: async (groupId, disciplineId) => {
    const res = await api.get<Grade[]>(`/grades/by-group?groupId=${groupId}&disciplineId=${disciplineId}`);
    set({ grades: res.data });
  },

  loadGradesByLessonId: (lessonId) => {
    return get().grades.filter((g) => g.lesson.id === lessonId);
  },

  findGradeByStudentAndLesson: (studentId, lessonId) => {
    return get().grades.find(
      (g) => g.student?.id === studentId && g.lesson?.id === lessonId
    );
  },

  createGrade: async (grade) => {
    const res = await api.post('/grades', grade);
    set((state) => ({ grades: [...state.grades, res.data] }));
  },

  updateGrade: async (id, grade) => {
    const res = await api.patch<Grade>(`/grades/${id}`, grade);
    set((state) => ({
      grades: state.grades.map((g) => (g.id === id ? res.data : g)),
    }));
  },
}));
