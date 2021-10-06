import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CourseDocument } from 'src/schemas/course.schema';
import { PhotoDocument } from 'src/schemas/photo.schema';
import { UserDocument } from 'src/schemas/user.schema';
export declare class AdminService {
    private courseModel;
    private photoModel;
    private userModel;
    private cloudinaryService;
    constructor(courseModel: Model<CourseDocument>, photoModel: Model<PhotoDocument>, userModel: Model<UserDocument>, cloudinaryService: CloudinaryService);
    deletesImageDontUse(): Promise<any>;
    getAllUsers(): Promise<any>;
}
