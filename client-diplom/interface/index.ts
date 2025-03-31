export interface User {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  role: Role;
  group?: Group;
}

export interface Role {
  id: number;
  value: string;
  description: string;
}

export interface Group {
  id: number;
  name: string;
  course: number;
  speciality: Speciality;
}

export interface Speciality {
  id: number;
  name: string;
  duration: number;
}

export interface Schedule {
  group: Group;
  discipline: Discipline;
  teacher: User;
  dayOfWeek: number;
  room: string;
}

export interface Discipline {
  id: number;
  name: string;
  teacher: User;
  studyPlans: any;
}

export interface StudyPlan {
  id: number;
  speciality: Speciality;
  discipline: Discipline;
  semestr: number;
}

export interface Lesson {
  id: number;
  schedule: Schedule;
  date: string;
  topic: string;
}

export interface Grade {
  id: number;
  lesson: Lesson;
  student: User;
  grade: number;
  comment?: string;
}

export interface DecodedUser {
    email: string;
    id: number;
    roles: string[];
}

export interface UserState {
  user: User | null;

  users: User[] | null;
  setUser: () => Promise<boolean>;
  getAllUsers: () => Promise<void>;
}
