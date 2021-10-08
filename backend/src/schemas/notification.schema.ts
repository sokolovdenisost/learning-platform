import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  user_id: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
