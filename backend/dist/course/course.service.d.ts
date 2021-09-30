/// <reference types="multer" />
import { Model } from 'mongoose';
import { CourseDocument } from 'src/schemas/course.schema';
import { ISuccess, IError } from '../error.interface';
import { LessonDocument } from 'src/schemas/lesson.schema';
import { CreateCourseDTO, EditCourseDTO, FavoriteCourseDTO, JoinCourseDTO, NextLessonDTO, RatingForCourseDTO } from './dto/course.dto';
import { ValidateService } from 'src/validate/validate.service';
import { PhotoDocument } from 'src/schemas/photo.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserDocument } from 'src/schemas/user.schema';
export declare class CourseService {
    private courseModel;
    private lessonModel;
    private photoModel;
    private userModel;
    private validateService;
    private cloudinaryService;
    constructor(courseModel: Model<CourseDocument>, lessonModel: Model<LessonDocument>, photoModel: Model<PhotoDocument>, userModel: Model<UserDocument>, validateService: ValidateService, cloudinaryService: CloudinaryService);
    test(): Promise<any>;
    getCourseByIdAndUserId(id: string, user_id: string): Promise<any>;
    editCourseById(body: EditCourseDTO, id: string, file: Express.Multer.File): Promise<ISuccess | IError>;
    getCourseById(id: string): Promise<any>;
    createCourse(body: CreateCourseDTO, file: Express.Multer.File): Promise<any>;
    deleteCourse(id: string, user_id: string): Promise<ISuccess | IError | any>;
    toggleFavorite(body: FavoriteCourseDTO): Promise<ISuccess | IError>;
    ratingForCourse(body: RatingForCourseDTO, course_id: string): Promise<ISuccess | IError>;
    joinCourse(body: JoinCourseDTO): Promise<ISuccess | IError>;
    nextLesson(body: NextLessonDTO): Promise<ISuccess | IError | any>;
}
