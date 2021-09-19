import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { ISuccess, IError } from '../error.interface';
import { Lesson, LessonDocument } from 'src/schemas/lesson.schema';
import { CreateCourseDTO, EditCourseDTO, FavoriteCourseDTO, JoinCourseDTO, NextLessonDTO, RatingForCourseDTO } from './dto/course.dto';
import { ValidateService } from 'src/validate/validate.service';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private validateService: ValidateService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getCourseByIdAndUserId(id: string, user_id: string): Promise<any> {
    if (mongoose.isValidObjectId(id) && mongoose.isValidObjectId(user_id)) {
      const course = await this.courseModel.findById(id).populate('lessons');

      if (course) {
        if (String(course.owner) === user_id) {
          return { code: 200, text: `Course ${id}`, type: 'Success', course };
        } else {
          return { code: 404, text: 'Course is not found', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Course is not found', type: 'Error' };
    }
  }

  async editCourseById(body: EditCourseDTO, id: string): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(id)) {
      await this.courseModel.findByIdAndUpdate(id, body);

      return { code: 200, text: 'Course is update', type: 'Success' };
    }
  }

  async getCourseById(id: string): Promise<any> {
    if (mongoose.isValidObjectId(id)) {
      const course = await this.courseModel.findById(id).populate('owner', 'firstName lastName');

      if (course) {
        return { code: 200, text: `Course ${id}`, type: 'Success', course };
      } else {
        return { code: 404, text: 'Course not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Course not found', type: 'Error' };
    }
  }

  async createCourse(body: CreateCourseDTO, file: Express.Multer.File): Promise<any> {
    const { _id, certificate, description, level, tags, title } = body;
    if (file) {
      if (_id.trim() && certificate && description.trim() && level && tags && title.trim()) {
        if (!this.validateService.validateLength(title, 50, 10)) {
          return { code: 400, text: 'Title must have more than 10 characters but less than 50', type: 'Error' };
        }

        if (!this.validateService.validateLength(description, 1000, 100)) {
          return { code: 400, text: 'Description must have more than 100 characters but less than 1000', type: 'Error' };
        }
        const uploadFile = await this.cloudinaryService.uploadImage(file);
        const photo = await new this.photoModel({
          photo_url: uploadFile.url,
          public_id: uploadFile.public_id,
        });
        await photo.save();

        const course = await new this.courseModel({ owner: _id, certificate, description, image: photo, level, tags: JSON.parse(tags), title });

        await course.save();

        return { code: 200, text: 'Course is created', type: 'Success', course_id: course._id.toString() };
      } else {
        return { code: 400, text: 'Not all fields are filled', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Not image found', type: 'Error' };
    }
  }

  async deleteCourse(id: string, user_id: string): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(id) && mongoose.isValidObjectId(user_id)) {
      const course = await this.courseModel.findById(id);
      if (course && String(course.owner) === user_id) {
        await this.courseModel.findByIdAndDelete(id);

        return { code: 200, text: 'Course is delete', type: 'Success' };
      } else {
        return { code: 400, text: 'Course is not found', type: 'Error' };
      }
    }

    return { code: 404, text: 'Course is not found', type: 'Error' };
  }

  async toggleFavorite(body: FavoriteCourseDTO): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(body.course_id) && mongoose.isValidObjectId(body.user_id)) {
      const course = await this.courseModel.findById(body.course_id);
      if (course) {
        const user = await this.userModel.findById(body.user_id);

        if (user) {
          const check = user.favorites.filter((c) => String(c) === body.course_id);

          if (check.length) {
            const idx = user.favorites.findIndex((c) => c === course._id);

            user.favorites.splice(idx, 1);
            await user.save();

            return { code: 200, text: 'Remove favorite', type: 'Success' };
          } else {
            user.favorites.push(course);

            await user.save();

            return { code: 200, text: 'Add favorite', type: 'Success' };
          }
        } else {
          return { code: 401, text: 'Unauthorized', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid data', type: 'Error' };
    }
  }

  async ratingForCourse(body: RatingForCourseDTO, course_id: string): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(body.user) && mongoose.isValidObjectId(course_id)) {
      const user = await this.userModel.findById(body.user);
      const course = await this.courseModel.findById(course_id);

      if (!user) {
        return { code: 400, text: 'Unauthorized', type: 'Error' };
      }

      if (course && user) {
        const check = course.rating.filter((r) => String(r.user) === body.user);

        if (check.length) {
          return { code: 200, text: 'The rating is already', type: 'Success' };
        } else {
          course.rating.push({
            user: body.user,
            ratingNum: body.rating,
          });

          await course.save();

          return { code: 200, text: 'Successfully rated', type: 'Success' };
        }
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid data', type: 'Error' };
    }
  }

  async joinCourse(body: JoinCourseDTO): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(body.user_id) && mongoose.isValidObjectId(body.course_id)) {
      const user = await this.userModel.findById(body.user_id);
      const course = await this.courseModel.findById(body.course_id);
      if (user && course) {
        const check = user.takeCourses.filter((c) => String(c.course) === String(course._id));
        if (check.length) {
          return { code: 200, text: 'You are already taking this course', type: 'Success' };
        } else {
          user.takeCourses.push({
            course: course,
            currentLesson: 1,
          });

          await user.save();

          return { code: 200, text: 'Joined the course', type: 'Success' };
        }
      } else {
        return { code: 404, text: 'User and course is not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'For user and course is not valid id', type: 'Error' };
    }
  }

  async nextLesson(body: NextLessonDTO): Promise<ISuccess | IError | any> {
    if (mongoose.isValidObjectId(body.course_id) && mongoose.isValidObjectId(body.user_id) && mongoose.isValidObjectId(body.lesson_id)) {
      const course = await this.courseModel.findById(body.course_id);
      const user = await this.userModel.findById(body.user_id);
      const lesson = await this.lessonModel.findById(body.lesson_id);

      if (course && user && lesson) {
        const idxCourse = user.takeCourses.findIndex((crs) => String(crs.course) === String(course._id));

        if (idxCourse >= 0) {
          if (user.takeCourses[idxCourse].currentLesson - 1 <= course.lessons.length) {
            const idxLesson = course.lessons.findIndex((les) => String(les) === body.lesson_id);

            user.takeCourses[idxCourse] = {
              ...user.takeCourses[idxCourse],
              course,
              currentLesson: idxLesson + 2,
            };

            await user.save();

            return { code: 200, text: 'Text', type: 'Success', nextLessonId: course.lessons[idxLesson + 1] };
          } else {
            return { code: 200, text: 'Completed course', type: 'Success' };
          }
        } else {
          return { code: 400, text: 'Take course not found', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Course or user or lesson not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid id', type: 'Error' };
    }
  }
}
