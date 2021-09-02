import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChangePasswordDTO, ChangePersonalDataDTO } from './dto/settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post('change-personal-data')
  async changePersonalData(@Res() res: Response, @Body() body: ChangePersonalDataDTO): Promise<void> {
    const result = await this.settingsService.changePersonalData(body);
    res.json(result).status(result.code);
  }

  @Post('change-password')
  async changePassword(@Res() res: Response, @Body() body: ChangePasswordDTO): Promise<void> {
    const result = await this.settingsService.changePassword(body);
    res.json(result).status(result.code);
  }
}
