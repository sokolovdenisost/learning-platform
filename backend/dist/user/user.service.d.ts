import { Model } from 'mongoose';
import { CourseDocument } from 'src/schemas/course.schema';
import { NotificationDocument } from 'src/schemas/notification.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class UserService {
    private userModel;
    private courseModel;
    private notificationModel;
    constructor(userModel: Model<UserDocument>, courseModel: Model<CourseDocument>, notificationModel: Model<NotificationDocument>);
    getUserById(user_id: string): Promise<any>;
    getNotifications(id: string): Promise<any>;
}
