import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { ICreateCourse } from './interface/course.interface';
import { ISuccess, IError } from '../error.interface';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getCourseById(id: string): Promise<any> {
    if (mongoose.isValidObjectId(id)) {
      const course = await this.courseModel.findById(id);

      if (course) {
        return { code: 200, text: `Course ${id}`, type: 'Success', course };
      } else {
        return { code: 404, text: 'Course not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Course not found', type: 'Error' };
    }
  }

  async createCourse(body: ICreateCourse): Promise<any> {
    const { _id, certificate, description, image, level, tags, title } = body;
    if (_id.trim() && certificate && description.trim() && image && level && tags && title.trim()) {
      const course = await new this.courseModel({ owner: _id, certificate, description, image, level, tags, title });

      await course.save();
      console.log(course._id);

      return { code: 200, text: 'Course is created', type: 'Success', course_id: course._id.toString() };
    } else {
      return { code: 400, text: 'Not all fields are filled', type: 'Error' };
    }
  }
}
