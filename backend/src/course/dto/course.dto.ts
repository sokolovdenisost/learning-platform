export class CreateCourseDTO {
  _id: string;
  image: string;
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse;
  tags: string[];
}

export class CreateLessonDTO {
  _id: string;
  array: Array<{ typeForm: string; text: string }>;
}

export class DeleteCourseDTO {
  user_id: string;
}

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
