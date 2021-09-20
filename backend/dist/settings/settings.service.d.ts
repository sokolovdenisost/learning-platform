/// <reference types="multer" />
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { IChangePassword, IChangePersonalData } from './interface/settings.interface';
import { IError, ISuccess } from '../error.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PhotoDocument } from 'src/schemas/photo.schema';
export declare class SettingsService {
    private userModel;
    private photoModel;
    private cloudinaryService;
    constructor(userModel: Model<UserDocument>, photoModel: Model<PhotoDocument>, cloudinaryService: CloudinaryService);
    changePersonalData(body: IChangePersonalData): Promise<ISuccess | IError>;
    changePassword(body: IChangePassword): Promise<ISuccess | IError>;
    changePhoto(user_id: string, file: Express.Multer.File): Promise<ISuccess | IError>;
}
