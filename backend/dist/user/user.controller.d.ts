import { Response } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getNotifications(res: Response, id: string): Promise<void>;
    getUser(res: Response, id: string): Promise<void>;
}
