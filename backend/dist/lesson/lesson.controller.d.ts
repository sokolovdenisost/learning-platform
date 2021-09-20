import { AddCommentIdLessonDTO, CreateLessonDTO, DeleteLessonDTO, EditLessonDTO } from './dto/lesson.dto';
import { LessonService } from './lesson.service';
import { Response } from 'express';
export declare class LessonController {
    private lessonService;
    constructor(lessonService: LessonService);
    createLesson(res: Response, body: CreateLessonDTO): Promise<void>;
    editLesson(res: Response, body: EditLessonDTO): Promise<void>;
    getEditLessonByCourse(res: Response, params: any): Promise<void>;
    deleteLesson(res: Response, body: DeleteLessonDTO): Promise<void>;
    getLessonById(res: Response, params: any): Promise<void>;
    addCommentInLesson(res: Response, id: string, body: AddCommentIdLessonDTO): Promise<any>;
}
