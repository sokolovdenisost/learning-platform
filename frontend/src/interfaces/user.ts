import { ICourse } from './course';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    photo_url: string;
    public_id: string;
  };
  _id: string;
  favorites: ICourse[];
  registered: string;
  takeCourses: TakeCourses[];
}

interface TakeCourses {
  course: string;
  currentLesson: number;
}
