import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IChangePassword, IChangePersonalData } from './interface/settings.interface';
import { IError, ISuccess } from '../error.interface';

const saltOrRounds = 10;

@Injectable()
export class SettingsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async changePersonalData(body: IChangePersonalData): Promise<ISuccess | IError> {
    if (body._id) {
      if (body.firstName.trim() || body.lastName.trim() || body.email.trim()) {
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
}
