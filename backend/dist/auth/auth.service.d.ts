import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { ICreateUser, ILoginUser } from './interface/auth.interface';
import { IError, ISuccess } from '../error.interface';
import { ValidateService } from 'src/validate/validate.service';
export declare class AuthService {
    private userModel;
    private validateService;
    constructor(userModel: Model<UserDocument>, validateService: ValidateService);
    loginUser(data: ILoginUser): Promise<any>;
    createUser(data: ICreateUser): Promise<ISuccess | IError>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserById(id: string): Promise<UserDocument>;
}
