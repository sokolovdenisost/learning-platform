import { ICourse } from "./course";
import { ILesson } from "./lesson";
import { IUser } from "./user";

export interface IState {
  user: IStateUser;
  lesson: IStateLesson;
  courses: IStateCourses;
  course: IStateCourse;
}

export interface IStateLesson {
  lesson: ILesson;
  error: boolean;
  loading: boolean;
}

export interface IStateUser {
  user: IUser;
  profile: IUser;
  users: IUser[];
  notifications: INotification[];
  loading: boolean;
  error: boolean;
}

export interface IStateCourses {
  loading: boolean;
  allCourses: ICourse[];
  takeCourses: ITakeCourse[];
  favoriteCourses: ICourse[];
  createdCourses: ICourse[];
  completedCourses: ICourse[];
  provenCourses: ICourse[];
  untestedCourses: ICourse[];
}

export interface IStateCourse {
  loading: boolean;
  error: boolean;
  course: ICourse;
}

interface INotification {
  _id: string;
  type: string;
  text: string;
  user_id: string;
}

interface ITakeCourse {
  course: ICourse;
  _id: string;
  currentLesson: number;
}
