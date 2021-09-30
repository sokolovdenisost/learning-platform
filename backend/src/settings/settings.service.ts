import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IChangePassword, IChangePersonalData } from './interface/settings.interface';
import { IError, ISuccess } from '../error.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';

const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const saltOrRounds = 10;

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async changePersonalData(body: IChangePersonalData): Promise<ISuccess | IError> {
    if (body._id) {
      if (body.firstName.trim() && body.lastName.trim() && body.email.trim()) {
        await this.userModel.findByIdAndUpdate(body._id, body);
        return { code: 200, text: 'Changed personal data', type: 'Success' };
      } else {
        return { code: 400, text: 'Fields must not be empty', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Try later please', type: 'Error' };
    }
  }

  async changePassword(body: IChangePassword): Promise<ISuccess | IError> {
    if (body._id) {
      const user = await this.userModel.findById(body._id);
      const checkPassword = bcrypt.compareSync(body.oldPassword, user.password);
      if (body.newPassword.trim()) {
        if (checkPassword) {
          const password = bcrypt.hashSync(body.newPassword, saltOrRounds);
          await this.userModel.findByIdAndUpdate(body._id, { password: password });

          return { code: 200, text: 'Password changed', type: 'Success' };
        } else {
          return { code: 400, text: 'Data is incorrect', type: 'Error' };
        }
      } else {
        return { code: 400, text: 'Field must not be empty', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'Try later please', type: 'Error' };
    }
  }

  async changePhoto(user_id: string, file: Express.Multer.File): Promise<ISuccess | IError> {
    if (file && isValidObjectId(user_id)) {
      if (fileTypes.find((c) => c === file.mimetype)) {
        const mb = file.size / 1024 / 1024;
        if (mb <= 3) {
          const uploadFile = await this.cloudinaryService.uploadImage(file);
          const photo = await new this.photoModel({
            photo_url: uploadFile.url,
            public_id: uploadFile.public_id,
          });

          await this.userModel.findByIdAndUpdate(user_id, { avatar: photo });
          await photo.save();

          return { code: 200, text: 'File is updated', type: 'Success' };
        } else {
          return { code: 400, text: 'Max file size 3 MB', type: 'Error' };
        }
      } else {
        return { code: 400, text: 'Invalid file type', type: 'Error' };
      }
    } else {
      return { code: 400, text: 'File is empty', type: 'Error' };
    }
  }
}

// Сделать функцию которая будет удалять фотографии которые находятся в cloudinary если их никто не использует
