export declare class DeleteLessonDTO {
    course_id: string;
    lesson_id: string;
}
export declare class EditLessonDTO {
    course_id: string;
    lesson_id: string;
    array: Array<{
        typeForm: string;
        text: string;
    }>;
}
export declare class CreateLessonDTO {
    _id: string;
    array: Array<{
        typeForm: string;
        text: string;
    }>;
}
export declare class AddCommentIdLessonDTO {
    user: string;
    comment: string;
}
