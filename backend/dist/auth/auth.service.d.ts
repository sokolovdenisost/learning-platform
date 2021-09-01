import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { ICreateUser, ILoginUser } from './interface/auth.interface';
import { IError, ISuccess } from '../error.interface';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    loginUser(data: ILoginUser): Promise<any>;
    createUser(data: ICreateUser): Promise<ISuccess | IError>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserById(id: string): Promise<UserDocument>;
}
