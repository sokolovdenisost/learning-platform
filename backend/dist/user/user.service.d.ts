import { Model } from 'mongoose';
import { CourseDocument } from 'src/schemas/course.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class UserService {
    private userModel;
    private courseModel;
    constructor(userModel: Model<UserDocument>, courseModel: Model<CourseDocument>);
    getUserById(user_id: string): Promise<any>;
}
