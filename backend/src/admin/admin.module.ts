import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Course, CourseSchema } from 'src/schemas/course.schema';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { Photo, PhotoSchema } from 'src/schemas/photo.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Photo.name, schema: PhotoSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {
  constructor(private adminCourse: AdminService) {}
}
