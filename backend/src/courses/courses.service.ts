import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getCoursesById(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      const courses = await this.courseModel.find();

      const coursesById = courses.filter((c) => String(c.owner) === id);

      return { code: 200, text: 'All courses', type: 'Success', courses: coursesById };
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }
}
