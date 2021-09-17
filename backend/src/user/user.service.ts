import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getUserById(user_id: string): Promise<any> {
    if (isValidObjectId(user_id)) {
      const user = await this.userModel.findById(user_id);

      if (user) {
        return { code: 200, text: 'User found', type: 'Success', user };
      } else {
        return { code: 404, text: 'User not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid id', type: 'Error' };
    }
  }
}
