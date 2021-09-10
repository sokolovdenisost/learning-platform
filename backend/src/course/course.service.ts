import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { ISuccess, IError } from '../error.interface';
import { Lesson, LessonDocument } from 'src/schemas/lesson.schema';
import { CreateCourseDTO, CreateLessonDTO, DeleteLessonDTO, EditCourseDTO, EditLessonDTO, FavoriteCourseDTO } from './dto/course.dto';
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

  async getLessonByCourse(course_id: string, lesson_id: string): Promise<any> {
    if (mongoose.isValidObjectId(course_id) && mongoose.isValidObjectId(lesson_id)) {
      const course = await this.courseModel.findById(course_id);
      if (course) {
        const lesson = await this.lessonModel.findById(lesson_id);

        if (lesson) {
          const check = course.lessons.find((c) => String(c) === lesson_id);

          if (check) {
            return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
          } else {
            return { code: 404, text: `Lesson is not found`, type: 'Error' };
          }
        } else {
          return { code: 404, text: 'Lesson is not found', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Lesson is not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Lesson is not found', type: 'Error' };
    }
  }

  async editLesson(body: EditLessonDTO): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(body.course_id) && mongoose.isValidObjectId(body.lesson_id)) {
      const course = await this.courseModel.findById(body.course_id);
      if (course) {
        const check = course.lessons.find((lesson) => String(lesson) === body.lesson_id);

        if (check) {
          await this.lessonModel.findByIdAndUpdate(body.lesson_id, { array: body.array });

          return { code: 200, text: 'Lesson is update', type: 'Success' };
        } else {
          return { code: 404, text: 'Course is not found', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
    }
  }

  async deleteLesson(body: DeleteLessonDTO): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(body.course_id) && mongoose.isValidObjectId(body.lesson_id)) {
      const course = await this.courseModel.findById(body.course_id);
      if (course) {
        await this.lessonModel.findByIdAndDelete(body.lesson_id);

        course.lessons = course.lessons.filter((lesson) => String(lesson) !== body.lesson_id);

        await course.save();

        return { code: 200, text: 'Lesson is deleted', type: 'Success' };
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
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

  async createLesson(body: CreateLessonDTO): Promise<ISuccess | IError> {
    const course = await this.courseModel.findById(body._id);
    const lesson = await new this.lessonModel({ course: body._id, array: body.array });

    await lesson.save();

    course.lessons.push(lesson);
    await course.save();

    return { code: 200, text: 'Lesson is added', type: 'Success' };
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
          return { code: 404, text: 'User is not found', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Course is not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid data', type: 'Error' };
    }
  }
}
