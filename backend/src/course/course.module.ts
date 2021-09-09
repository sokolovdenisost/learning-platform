import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { Lesson, LessonSchema } from 'src/schemas/lesson.schema';
import { Photo, PhotoSchema } from 'src/schemas/photo.schema';
import { ValidateModule } from 'src/validate/validate.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Photo.name, schema: PhotoSchema },
    ]),
    ValidateModule,
    CloudinaryModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {
  constructor(private courseService: CourseService) {}
}
