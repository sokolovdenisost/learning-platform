import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';
import { Photo } from './photo.schema';
export declare type UserDocument = User & Document;
export declare class User {
    avatar: Photo;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registered: string;
    favorites: Course[];
    takeCourses: TakeCourse[];
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, {}>;
interface TakeCourse {
    course: Course;
    currentLesson: number;
}
export {};
