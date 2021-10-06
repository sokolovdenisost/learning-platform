export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    photo_url: string;
    public_id: string;
  };
  _id: string;
  registered: string;
  takeCourses: TakeCourses[];
  completedCourses: string[];
  role: string;
}

interface TakeCourses {
  course: string;
  currentLesson: number;
}
