/// <reference types="multer" />
import { Response } from 'express';
import { ChangePasswordDTO, ChangePersonalDataDTO } from './dto/settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    changePersonalData(res: Response, body: ChangePersonalDataDTO): Promise<void>;
    changePassword(res: Response, body: ChangePasswordDTO): Promise<void>;
    changePhoto(res: Response, body: any, file: Express.Multer.File): Promise<void>;
}
