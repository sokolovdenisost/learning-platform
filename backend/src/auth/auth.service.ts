import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ICreateUser, IError, ILoginUser, ISuccess } from './interface/auth.interface';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async loginUser(data: ILoginUser, session): Promise<ISuccess | IError> {
    if (data.email && data.password) {
      const user = await this.findUserByEmail(data.email);

      if (user) {
        const checkPassword = bcrypt.compareSync(data.password, user.password);

        if (checkPassword) {
          session.user = user;
          session.isAuth = true;
          await session.save((err) => {
            if (err) console.log(err);
          });
          console.log(session);
          return { code: 200, type: 'Success', text: 'Signed into account' };
        } else {
          return { code: 400, type: 'Error', text: 'Data is incorrect' };
        }
        // Проверяем пароли и если все хорошо то добавляем юзера в сессию
      } else {
        return { code: 400, type: 'Error', text: 'Data is incorrect' };
      }
    } else {
      return { code: 400, type: 'Error', text: 'Not all fields are filled' };
    }
  }

  async createUser(data: ICreateUser): Promise<ISuccess | IError> {
    if (data.firstName && data.lastName && data.email && data.password) {
      if (!(await this.findUserByEmail(data.email))) {
        if (data.password.length >= 10) {
          const hashPassword = await bcrypt.hashSync(data.password, saltOrRounds);
          const user = new this.userModel({ ...data, password: hashPassword });

          await user.save();
          return { code: 200, type: 'Success', text: 'User is registered' };
        } else if (data.password.length < 10) {
          // Error: Если пароль меньше 10 символов
          return { code: 400, type: 'Error', text: 'Password must be at least 10 characters' };
        }
      } else {
        // Error: Если емаил уже занят
        return { code: 400, type: 'Error', text: 'This email is already taken' };
      }
    } else {
      // Error: Если все поля пустые
      return { code: 400, type: 'Error', text: 'Not all fields are filled' };
    }
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findUserById(id: string): Promise<UserDocument> {
    if (mongoose.isValidObjectId(id)) {
      return await this.userModel.findById(id);
    }
  }
}
