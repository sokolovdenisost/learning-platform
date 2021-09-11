export class CreateCourseDTO {
  _id: string;
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse;
  tags: string;
}

export class CreateLessonDTO {
  _id: string;
  array: Array<{ typeForm: string; text: string }>;
}

export class EditCourseDTO {
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse;
  tags: string[];
}

export class EditLessonDTO {
  course_id: string;
  lesson_id: string;
  array: Array<{ typeForm: string; text: string }>;
}

export class DeleteCourseDTO {
  user_id: string;
}

export class DeleteLessonDTO {
  course_id: string;
  lesson_id: string;
}

export class FavoriteCourseDTO {
  user_id: string;
  course_id: string;
}

export class RatingForCourseDTO {
  rating: number;
  user: string;
}

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
