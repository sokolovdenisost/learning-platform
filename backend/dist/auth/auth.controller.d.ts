import { Response } from 'express';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAuth(res: Response, session: any): Promise<void>;
    registerUser(res: Response, body: CreateUserDTO): Promise<void>;
    loginUser(res: Response, body: LoginUserDTO, session: any): Promise<void>;
}
