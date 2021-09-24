import { Response } from 'express';
import { CoursesService } from './courses.service';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    getCreatedCoursesByUserId(res: Response, id: string): Promise<void>;
    getTakeCoursesByUserId(res: Response, id: string): Promise<void>;
    getFavoriteCourses(res: Response, id: string): Promise<void>;
    getAllCourses(res: Response): Promise<void>;
}
