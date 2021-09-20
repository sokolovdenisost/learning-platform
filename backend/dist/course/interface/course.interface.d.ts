export interface ICreateCourse {
    _id: string;
    image: string;
    title: string;
    description: string;
    certificate: string;
    level: LevelCourse;
    tags: string[];
}
export interface ICreateLesson {
    _id: string;
    array: Array<{
        typeForm: string;
        text: string;
    }>;
}
declare type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
export {};
