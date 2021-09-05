import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Lesson } from './lesson.schema';
import { User } from './user.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  certificate: string;

  @Prop({ type: String, required: true })
  level: LevelCourse;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' })
  lessons: Lesson[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// interface Lesson {
//   title: string;
//   array: Array<{ type: string; text: string }>;
// }
type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
