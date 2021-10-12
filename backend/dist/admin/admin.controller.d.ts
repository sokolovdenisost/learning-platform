import { Response } from 'express';
import { AdminService } from './admin.service';
import { BanUserDTO, SendNotificationDTO, SetVerifiedDTO } from './dto/admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    deleteImagesDontUse(res: Response): Promise<void>;
    setVerified(res: Response, body: SetVerifiedDTO): Promise<void>;
    sendNotification(res: Response, body: SendNotificationDTO): Promise<void>;
    toggleBanUser(res: Response, body: BanUserDTO): Promise<void>;
    getBanUsers(res: Response): Promise<void>;
    getAllUsers(res: Response): Promise<void>;
}
