import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { ISuccess, IError } from '../error.interface';
import { Lesson, LessonDocument } from 'src/schemas/lesson.schema';
import {
  CreateCourseDTO,
  EditCourseDTO,
  FavoriteCourseDTO,
  JoinCourseDTO,
  NextLessonDTO,
  RatingForCourseDTO,
} from './dto/course.dto';
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

  async test(): Promise<any> {
    const courses = await this.courseModel.find();
    const users = await this.userModel.find();
    const photos = await this.photoModel.find();

    const allUsePhotos: string[] = [];
    const allPhotos = [];
    const allDeletePhotoIDS = [];
    const array = [1, 2, 3];

    courses.forEach((course) => allUsePhotos.push(course.image.public_id));
    users.forEach((user) => allUsePhotos.push(user.avatar.public_id));
    photos.forEach((photo) => allPhotos.push(photo));

    for (let elem of allPhotos) {
      const check = allUsePhotos.find((c) => c === elem.public_id);

      if (check === undefined) {
        allDeletePhotoIDS.push(elem);
      }
    }

    allDeletePhotoIDS.forEach(async (photo) => {
      await this.photoModel.findByIdAndDelete(photo._id);
      await this.cloudinaryService.removeImage(photo.public_id);
    });

    return { code: 200, text: 'Photos that are not in use deleted', type: 'Success' };
  }

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

  async editCourseById(body: EditCourseDTO, id: string, file: Express.Multer.File): Promise<ISuccess | IError> {
    if (mongoose.isValidObjectId(id)) {
      const course = await this.courseModel.findById(id);
      if (course && String(course.owner) === body.user_id) {
        const tags = JSON.parse(body.tags);
        if (file) {
          const result = await this.cloudinaryService.uploadFunc(file);
          const photo = await new this.photoModel({ photo_url: result.url, public_id: result.public_id });
          await this.courseModel.findByIdAndUpdate(id, {
            ...body,
            tags,
            image: { photo_url: result.url, public_id: result.public_id },
          });

          await photo.save();
        } else {
          await this.courseModel.findByIdAndUpdate(id, { ...body, tags });
        }

        return { code: 200, text: 'Course is update', type: 'Success' };
      } else {
        return { code: 404, text: 'Course not found', type: 'Error' };
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
          return {
            code: 400,
            text: 'Description must have more than 100 characters but less than 1000',
            type: 'Error',
          };
        }
        const uploadFile = await this.cloudinaryService.uploadImage(file);
        const photo = await new this.photoModel({
          photo_url: uploadFile.url,
          public_id: uploadFile.public_id,
        });
        await photo.save();

        const course = await new this.courseModel({
          owner: _id,
          certificate,
          description,
          image: photo,
          level,
          tags: JSON.parse(tags),
          title,
        });

        await course.save();

        return { code: 200, text: 'Course is created', type: 'Success', course_id: course._id.toString() };
      } else {
        return { code: 400, text: 'Not all fields are filled', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Not image found', type: 'Error' };
    }
  }

  async deleteCourse(id: string, user_id: string): Promise<ISuccess | IError | any> {
    if (mongoose.isValidObjectId(id) && mongoose.isValidObjectId(user_id)) {
      const completedCoursesForUsers = await this.userModel.find({ completedCourses: { $all: [id] } });
      const takeCoursesForUsers = await this.userModel.find({ 'takeCourses.course': id });

      const course = await this.courseModel.findById(id);
      if (course && String(course.owner) === user_id) {
        completedCoursesForUsers.forEach(async (user) => {
          const idx = user.completedCourses.findIndex((id) => id === course._id);
          user.completedCourses.splice(idx, 1);

          await user.save();
        });

        takeCoursesForUsers.forEach(async (user) => {
          const idx = user.takeCourses.findIndex((c) => c.course === course._id);
          user.takeCourses.splice(idx, 1);

          await user.save();
        });

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
          const check = course.favorites.filter((c) => String(c) === body.user_id);

          if (check.length) {
            const idx = course.favorites.findIndex((c) => c === course._id);

            course.favorites.splice(idx, 1);
            await course.save();

            return { code: 200, text: 'Remove favorite', type: 'Success' };
          } else {
            course.favorites.push(user._id);

            await course.save();

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
        const checkTakeCourse = user.takeCourses.filter((c) => String(c.course) === String(course._id));
        const checkCompletedCourse = user.completedCourses.filter((c) => String(c) === String(course._id));
        if (checkTakeCourse.length || checkCompletedCourse.length) {
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
    if (
      mongoose.isValidObjectId(body.course_id) &&
      mongoose.isValidObjectId(body.user_id) &&
      mongoose.isValidObjectId(body.lesson_id)
    ) {
      const course = await this.courseModel.findById(body.course_id);
      const user = await this.userModel.findById(body.user_id);
      const lesson = await this.lessonModel.findById(body.lesson_id);

      if (course && user && lesson) {
        const idxCourse = user.takeCourses.findIndex((crs) => String(crs.course) === String(course._id));

        if (idxCourse >= 0) {
          const idxLesson = course.lessons.findIndex((les) => String(les) === body.lesson_id);
          if (user.takeCourses[idxCourse].currentLesson < course.lessons.length) {
            user.takeCourses[idxCourse] = {
              ...user.takeCourses[idxCourse],
              course,
              currentLesson: idxLesson + 2,
            };

            await user.save();

            return { code: 200, text: 'Text', type: 'Success', nextLessonId: course.lessons[idxLesson + 1] };
          } else if (course.lessons.length === user.takeCourses[idxCourse].currentLesson) {
            user.takeCourses.splice(idxCourse, 1);

            user.completedCourses.push(course);

            await user.save();

            return { code: 200, text: 'Completed course', type: 'Success' };
          } else if (user.takeCourses[idxCourse].currentLesson > course.lessons.length) {
            const check = user.completedCourses.filter((c) => String(c) === String(course._id));

            if (check.length) {
              user.takeCourses.splice(idxCourse, 1);

              await user.save();

              return { code: 200, text: 'Course is already completed', type: 'Success' };
            }
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
