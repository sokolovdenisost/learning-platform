import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getCreatedCoursesByUserId(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      const courses = await this.courseModel.find({ owner: id }).populate('owner', 'firstName lastName');

      return { code: 200, text: 'All courses', type: 'Success', courses: courses };
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }

  async getTakeCoursesByUserId(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      const user = await this.userModel.findById(id).populate({
        path: 'takeCourses',
        populate: {
          path: 'course',
          populate: {
            path: 'owner',
            select: '_id firstName lastName',
          },
        },
      });

      if (user) {
        return { code: 200, text: 'All take courses', type: 'Success', courses: user.takeCourses };
      } else {
        return { code: 400, text: 'Error', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }

  async getAllCourses(): Promise<any> {
    const courses = await this.courseModel.find({}).populate('owner', '_id firstName lastName');
    return { code: 200, text: 'This all courses', courses: courses.reverse() };
  }
}
