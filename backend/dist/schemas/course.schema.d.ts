import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Lesson } from './lesson.schema';
import { Photo } from './photo.schema';
import { User } from './user.schema';
export declare type CourseDocument = Course & Document;
export declare class Course {
    owner: string;
    image: Photo;
    title: string;
    description: string;
    certificate: string;
    level: LevelCourse;
    tags: string[];
    lessons: Lesson[];
    rating: IRating[];
    favorites: User[];
    isVerification: boolean;
}
export declare const CourseSchema: mongoose.Schema<mongoose.Document<Course, any, any>, mongoose.Model<mongoose.Document<Course, any, any>, any, any, any>, {}>;
interface IRating {
    user: string;
    ratingNum: number;
}
declare type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
export {};
