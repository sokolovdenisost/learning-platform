import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';
import { Photo } from './photo.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: Photo,
    default: {
      public_id: '',
      photo_url: 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
    },
  })
  avatar: Photo;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: new Date().toLocaleDateString() })
  registered: string;

  @Prop({ type: [{ course: { type: mongoose.Types.ObjectId, ref: 'Course' }, currentLesson: Number }] })
  takeCourses: TakeCourse[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Course' }] })
  completedCourses: Course[];

  @Prop({ type: String, default: 'user' })
  role: string;

  @Prop({ type: Boolean, default: false })
  ban: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

interface TakeCourse {
  course: Course;
  currentLesson: number;
}
