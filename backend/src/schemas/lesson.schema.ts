import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: [{ typeForm: String, text: String }] })
  array: IArray[];

  @Prop({ type: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, comment: String }] })
  comments: IComment[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

interface IArray {
  typeForm: string;
  text: string;
}

interface IComment {
  user: mongoose.Types.ObjectId;
  comment: string;
}
