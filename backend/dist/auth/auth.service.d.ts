import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { ICreateUser, IError, ILoginUser, ISuccess } from './interface/auth.interface';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    loginUser(data: ILoginUser, session: any): Promise<ISuccess | IError>;
    createUser(data: ICreateUser): Promise<ISuccess | IError>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserById(id: string): Promise<UserDocument>;
}
