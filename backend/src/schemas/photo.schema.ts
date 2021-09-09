import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhotoDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop({ type: String, required: true })
  photo_url: string;

  @Prop({ type: String, required: true })
  public_id: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
