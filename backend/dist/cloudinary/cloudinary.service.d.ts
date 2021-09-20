/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFunc(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    removeImage(public_id: string): Promise<void>;
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
