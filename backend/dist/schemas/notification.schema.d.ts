import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type NotificationDocument = Notification & Document;
export declare class Notification {
    type: string;
    text: string;
    user_id: string;
}
export declare const NotificationSchema: mongoose.Schema<mongoose.Document<Notification, any, any>, mongoose.Model<mongoose.Document<Notification, any, any>, any, any, any>, {}>;
