import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CourseDocument } from 'src/schemas/course.schema';
import { NotificationDocument } from 'src/schemas/notification.schema';
import { PhotoDocument } from 'src/schemas/photo.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { SendNotificationDTO } from './dto/admin.dto';
export declare class AdminService {
    private courseModel;
    private photoModel;
    private userModel;
    private notificationModel;
    private cloudinaryService;
    constructor(courseModel: Model<CourseDocument>, photoModel: Model<PhotoDocument>, userModel: Model<UserDocument>, notificationModel: Model<NotificationDocument>, cloudinaryService: CloudinaryService);
    deletesImageDontUse(): Promise<any>;
    getAllUsers(): Promise<any>;
    getBanUsers(): Promise<any>;
    setVerified(id: string): Promise<any>;
    sendNotification(body: SendNotificationDTO): Promise<any>;
    banUser(id: string): Promise<any>;
}
