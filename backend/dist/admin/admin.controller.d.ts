import { Response } from 'express';
import { AdminService } from './admin.service';
import { SendNotification, SetVerifiedDTO } from './dto/admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    deleteImagesDontUse(res: Response): Promise<void>;
    setVerified(res: Response, body: SetVerifiedDTO): Promise<void>;
    sendNotification(res: Response, body: SendNotification): Promise<void>;
    getAllUsers(res: Response): Promise<void>;
}
