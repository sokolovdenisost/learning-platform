import { Model } from 'mongoose';
import { IError, ISuccess } from 'src/error.interface';
import { CourseDocument } from 'src/schemas/course.schema';
import { LessonDocument } from 'src/schemas/lesson.schema';
import { PhotoDocument } from 'src/schemas/photo.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { AddCommentIdLessonDTO, CreateLessonDTO, DeleteLessonDTO, EditLessonDTO } from './dto/lesson.dto';
export declare class LessonService {
    private courseModel;
    private lessonModel;
    private photoModel;
    private userModel;
    constructor(courseModel: Model<CourseDocument>, lessonModel: Model<LessonDocument>, photoModel: Model<PhotoDocument>, userModel: Model<UserDocument>);
    createLesson(body: CreateLessonDTO): Promise<ISuccess | IError>;
    editLesson(body: EditLessonDTO): Promise<ISuccess | IError>;
    deleteLesson(body: DeleteLessonDTO): Promise<ISuccess | IError>;
    getEditLessonByCourse(lesson_id: string, user_id: string): Promise<any>;
    getLessonById(lesson_id: string, user_id: string): Promise<any>;
    addCommentInLesson(lesson_id: string, body: AddCommentIdLessonDTO): Promise<any>;
}
