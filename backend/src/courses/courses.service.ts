import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getCoursesByUserId(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      const courses = await this.courseModel.find({ owner: id }).populate('owner', 'firstName lastName');
      // const coursesById = courses.filter((c) => String(c.owner) === id);

      return { code: 200, text: 'All courses', type: 'Success', courses: courses };
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }

  async getAllCourses(): Promise<any> {
    const courses = await this.courseModel.find({}).populate('owner', '_id firstName lastName');
    return { code: 200, text: 'This all courses', courses: courses.reverse() };
  }
}
