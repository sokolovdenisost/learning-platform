import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { Lesson, LessonSchema } from 'src/schemas/lesson.schema';
import { Photo, PhotoSchema } from 'src/schemas/photo.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Photo.name, schema: PhotoSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {
  constructor(private lessonService: LessonService) {}
}
