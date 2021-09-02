import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { CourseModule } from './course/course.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dv9wr.mongodb.net/learningPlatform'),
    AuthModule,
    SettingsModule,
    CourseModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {}
