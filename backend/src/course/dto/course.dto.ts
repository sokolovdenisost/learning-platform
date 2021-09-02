export class CreateCourseDTO {
  _id: string;
  image: string;
  title: string;
  description: string;
  certificate: boolean;
  level: LevelCourse;
  tags: string[];
}

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
