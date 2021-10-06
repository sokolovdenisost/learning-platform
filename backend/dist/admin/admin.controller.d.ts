import { Response } from 'express';
import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    deleteImagesDontUse(res: Response): Promise<void>;
    getAllUsers(res: Response): Promise<void>;
}
