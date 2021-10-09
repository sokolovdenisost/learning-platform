import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { Notification, NotificationDocument } from 'src/schemas/notification.schema';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SendNotificationDTO } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async deletesImageDontUse(): Promise<any> {
    try {
      const courses = await this.courseModel.find();
      const users = await this.userModel.find();
      const photos = await this.photoModel.find();

      const allUsePhotos: string[] = [];
      const allPhotos = [];
      const allDeletePhotoIDS = [];

      courses.forEach((course) => allUsePhotos.push(course.image.public_id));
      users.forEach((user) => allUsePhotos.push(user.avatar.public_id));
      photos.forEach((photo) => allPhotos.push(photo));
      for (let elem of allPhotos) {
        const check = allUsePhotos.find((c) => c === elem.public_id);
        if (check === undefined) {
          allDeletePhotoIDS.push(elem);
        }
      }
      allDeletePhotoIDS.forEach(async (photo) => {
        await this.photoModel.findByIdAndDelete(photo._id);
        await this.cloudinaryService.removeImage(photo.public_id);
      });
      return { code: 200, text: 'Photos that are not in use deleted', type: 'Success' };
    } catch (e) {
      return { code: 500, text: e.message, type: 'Error' };
    }
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userModel.find();

    return { code: 200, text: 'All users', type: 'Success', users };
  }

  async setVerified(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      await this.courseModel.findByIdAndUpdate(id, { isVerification: true });

      return { code: 200, text: 'Course is verified!', type: 'Success' };
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }

  async sendNotification(body: SendNotificationDTO): Promise<any> {
    if (isValidObjectId(body.user_id)) {
      if (body.text.trim() && body.type.trim()) {
        const notification = await new this.notificationModel(body);

        await notification.save();

        return { code: 200, text: 'Notification is created!', type: 'Success' };
      } else {
        return { code: 400, text: 'Not all fields are filled', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }

  async banUser(id: string): Promise<any> {
    if (isValidObjectId(id)) {
      this.userModel.findByIdAndUpdate(id, { ban: true });

      return { code: 200, text: 'This user is banned', type: 'Success' };
    } else {
      return { code: 400, text: 'ID is not valid', type: 'Error' };
    }
  }
}
