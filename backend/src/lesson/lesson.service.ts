import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IError, ISuccess } from 'src/error.interface';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { Lesson, LessonDocument } from 'src/schemas/lesson.schema';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AddCommentIdLessonDTO, CreateLessonDTO, DeleteLessonDTO, EditLessonDTO } from './dto/lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createLesson(body: CreateLessonDTO): Promise<ISuccess | IError> {
    const course = await this.courseModel.findById(body._id);
    const lesson = await new this.lessonModel({ course: body._id, array: body.array });

    await lesson.save();

    course.lessons.push(lesson);
    await course.save();

    return { code: 200, text: 'Lesson is added', type: 'Success' };
  }

  async editLesson(body: EditLessonDTO): Promise<ISuccess | IError> {
    if (isValidObjectId(body.course_id) && isValidObjectId(body.lesson_id)) {
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
    if (isValidObjectId(body.course_id) && isValidObjectId(body.lesson_id)) {
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

  async getEditLessonByCourse(lesson_id: string, user_id: string): Promise<any> {
    if (isValidObjectId(lesson_id) && isValidObjectId(user_id)) {
      const lesson = await this.lessonModel.findById(lesson_id).populate('course');
      if (lesson) {
        const checkOwner = String(lesson.course.owner) === user_id;
        if (checkOwner) {
          return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
        } else {
          return { code: 403, text: 'No access to the lesson', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Lesson is not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Invalid id', type: 'Error' };
    }
  }

  async getLessonById(lesson_id: string, user_id: string): Promise<any> {
    if (isValidObjectId(lesson_id) && isValidObjectId(user_id)) {
      const lesson = await this.lessonModel
        .findById(lesson_id)
        .populate({
          path: 'course',
          populate: {
            path: 'owner',
            select: '_id firstName lastName',
          },
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '_id firstName lastName avatar',
          },
        });

      const course = await this.courseModel.findById(lesson.course);
      const user = await this.userModel.findById(user_id);

      if (String(course.owner) === String(user._id)) {
        return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
      }

      if (course && lesson && user) {
        const checkTaked = user.takeCourses.filter((c) => String(c.course) === String(course._id));
        const checkCompleted = user.completedCourses.filter((c) => String(c) === String(course._id));
        if (checkTaked || checkCompleted) {
          const checkAccess = course.lessons.findIndex((l) => String(l) === String(lesson._id));
          if (checkCompleted || checkAccess <= checkTaked[0]['currentLesson'] - 1) {
            return { code: 200, text: `Lesson ${lesson_id}`, type: 'Success', lesson };
          } else {
            return { code: 400, text: 'No access to the lesson', type: 'Error' };
          }
        } else {
          return { code: 400, text: 'No access to the lesson', type: 'Error' };
        }
      } else {
        return { code: 404, text: 'Lesson is not found', type: 'Error' };
      }
    } else {
      return { code: 404, text: 'Lesson is not found', type: 'Error' };
    }
  }

  async addCommentInLesson(lesson_id: string, body: AddCommentIdLessonDTO): Promise<any> {
    if (isValidObjectId(lesson_id) && body.user.trim() && body.comment.trim().length >= 5) {
      const lesson = await this.lessonModel.findById(lesson_id);

      if (lesson) {
        lesson.comments.push({
          user: body.user,
          comment: body.comment,
        });

        await lesson.save();

        return { code: 200, text: 'Add comment in lesson', type: 'Success' };
      } else {
        return { code: 404, text: 'Lesson not found', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Invalid data', type: 'Error' };
    }
  }
}
