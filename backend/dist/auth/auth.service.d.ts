import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { ICreateUser, ILoginUser } from './interface/auth.interface';
import { IError, ISuccess } from '../error.interface';
import { ValidateService } from 'src/validate/validate.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private validateService;
    private jwtService;
    constructor(userModel: Model<UserDocument>, validateService: ValidateService, jwtService: JwtService);
    getAuth(token: string): Promise<any>;
    loginUser(data: ILoginUser): Promise<any>;
    createUser(data: ICreateUser): Promise<ISuccess | IError>;
    findUserByEmail(email: string): Promise<UserDocument>;
    findUserById(id: string): Promise<UserDocument>;
}
