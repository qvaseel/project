export interface User {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  dateOfBirth: string;
  role: Role;
  group?: Group;
}

export interface CreateUserDto {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  dateOfBirth: string;
  roleId: number;
  groupId?: number;
}

export interface UpdateUserDto {
  email: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  dateOfBirth: string;
  groupId?: number;
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

export interface CreateGroupDto {
  name: string;
  course: number;
  specialityId: number;
}

export interface Speciality {
  id: number;
  name: string;
  duration: number;
}

export interface Schedule {
  id: number;
  orderNumber: number;
  group: Group;
  discipline: Discipline;
  teacher: User;
  dayOfWeek: number;
  room: string;
  groupId?: number;
}

export interface CreateScheduleDto {
  id: number;
  orderNumber: number;
  groupId: number;
  disciplineId: number;
  teacherId: number;
  dayOfWeek: number;
  room: string;
}

export interface Discipline {
  id: number;
  name: string;
  teacher: User;
}

export interface CreateDisciplineDto {
  name: string;
  teacherId: number;
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
  topic?: string;
  typeOfLesson: string;
}

export interface LessonCreateDto {
  scheduleId: number;
  date: string;
  topic?: string;
  typeOfLesson: string;
}

export interface Grade {
  id: number;
  attend: boolean;
  lesson: Lesson;
  student: User;
  grade?: number;
  comment?: string;
}

export interface CreateGradeDto {
  lessonId: number;
  studentId: number;
  grade?: number;
  attend: boolean;
  comment?: string;
}

export interface DecodedUser {
  email: string;
  id: number;
  roles: string[];
}
