import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { CourseModule } from './course/course.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CoursesModule } from './courses/courses.module';
import { ValidateModule } from './validate/validate.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dv9wr.mongodb.net/learningPlatform'),
    AuthModule,
    SettingsModule,
    CourseModule,
    CloudinaryModule,
    CoursesModule,
    ValidateModule,
    LessonModule,
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {}
