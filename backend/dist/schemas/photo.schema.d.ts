import { Document } from 'mongoose';
export declare type PhotoDocument = Photo & Document;
export declare class Photo {
    photo_url: string;
    public_id: string;
}
export declare const PhotoSchema: import("mongoose").Schema<Document<Photo, any, any>, import("mongoose").Model<Document<Photo, any, any>, any, any, any>, {}>;
