export declare class CreateCourseDTO {
    _id: string;
    title: string;
    description: string;
    certificate: string;
    level: LevelCourse;
    tags: string;
}
export declare class EditCourseDTO {
    title: string;
    description: string;
    certificate: string;
    level: LevelCourse;
    tags: string;
    user_id: string;
}
export declare class DeleteCourseDTO {
    user_id: string;
}
export declare class FavoriteCourseDTO {
    user_id: string;
    course_id: string;
}
export declare class RatingForCourseDTO {
    rating: number;
    user: string;
}
export declare class JoinCourseDTO {
    user_id: string;
    course_id: string;
}
export declare class NextLessonDTO {
    user_id: string;
    course_id: string;
    lesson_id: string;
}
declare type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
export {};
