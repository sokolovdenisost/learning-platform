import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
}
