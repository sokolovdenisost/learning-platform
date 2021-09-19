import { ICourse } from './course';

export interface ILesson {
  _id: string;
  array: IBlock[];
  course: ICourse;
  comments: Comment[];
}

interface IBlock {
  typeForm: string;
  text: string;
  _id: string;
}

interface Comment {
  comment: string;
  user: {
    firstName: string;
    lastName: string;
    _id: string;
    avatar: {
      photo_url: string;
      public_id: string;
    };
  };
  date: string;
}
