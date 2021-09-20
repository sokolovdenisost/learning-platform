import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';
export declare type LessonDocument = Lesson & Document;
export declare class Lesson {
    course: Course;
    array: IArray[];
    comments: IComment[];
}
export declare const LessonSchema: mongoose.Schema<mongoose.Document<Lesson, any, any>, mongoose.Model<mongoose.Document<Lesson, any, any>, any, any>, {}>;
interface IArray {
    typeForm: string;
    text: string;
}
interface IComment {
    user: string;
    comment: string;
    date?: string;
}
export {};
