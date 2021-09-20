import { Model } from 'mongoose';
import { CourseDocument } from 'src/schemas/course.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class CoursesService {
    private courseModel;
    private userModel;
    constructor(courseModel: Model<CourseDocument>, userModel: Model<UserDocument>);
    getCreatedCoursesByUserId(id: string): Promise<any>;
    getTakeCoursesByUserId(id: string): Promise<any>;
    getAllCourses(): Promise<any>;
}
