import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ type: [{ typeForm: String, text: String }] })
  array: IArray[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

interface IArray {
  typeForm: string;
  text: string;
}
