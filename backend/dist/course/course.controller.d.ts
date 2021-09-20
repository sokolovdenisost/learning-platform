/// <reference types="multer" />
import { Response } from 'express';
import { CourseService } from './course.service';
import { CreateCourseDTO, DeleteCourseDTO, EditCourseDTO, FavoriteCourseDTO, JoinCourseDTO, NextLessonDTO, RatingForCourseDTO } from './dto/course.dto';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getCourseById(res: Response, id: string): Promise<void>;
    getCourseByIdAndUserId(res: Response, params: any): Promise<void>;
    joinCourse(res: Response, body: JoinCourseDTO): Promise<void>;
    createCourse(res: Response, body: CreateCourseDTO, file: Express.Multer.File): Promise<void>;
    editCourse(res: Response, body: EditCourseDTO, id: string): Promise<void>;
    toggleFavoriteCourse(res: Response, body: FavoriteCourseDTO): Promise<void>;
    setRatingForCourse(res: Response, body: RatingForCourseDTO, id: string): Promise<void>;
    nextLesson(res: Response, body: NextLessonDTO): Promise<void>;
    deleteCourse(res: Response, id: string, body: DeleteCourseDTO): Promise<void>;
}
