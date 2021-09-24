export class CreateCourseDTO {
  _id: string;
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse;
  tags: string;
}

export class EditCourseDTO {
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse;
  tags: string;
  user_id: string;
}

export class DeleteCourseDTO {
  user_id: string;
}

export class FavoriteCourseDTO {
  user_id: string;
  course_id: string;
}

export class RatingForCourseDTO {
  rating: number;
  user: string;
}

export class JoinCourseDTO {
  user_id: string;
  course_id: string;
}

export class NextLessonDTO {
  user_id: string;
  course_id: string;
  lesson_id: string;
}

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
