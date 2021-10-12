import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { BanUserDTO, SendNotificationDTO, SetVerifiedDTO } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('delete-images')
  async deleteImagesDontUse(@Res() res: Response): Promise<void> {
    const result = await this.adminService.deletesImageDontUse();

    res.json(result).status(result.code);
  }

  @Post('set-verified')
  async setVerified(@Res() res: Response, @Body() body: SetVerifiedDTO): Promise<void> {
    const result = await this.adminService.setVerified(body.id);

    res.json(result).status(result.code);
  }

  @Post('send-notification')
  async sendNotification(@Res() res: Response, @Body() body: SendNotificationDTO): Promise<void> {
    const result = await this.adminService.sendNotification(body);

    res.json(result).status(result.code);
  }

  @Post('ban-user')
  async toggleBanUser(@Res() res: Response, @Body() body: BanUserDTO): Promise<void> {
    const result = await this.adminService.toggleBanUser(body.id);

    res.json(result).status(result.code);
  }

  @Get('ban-users')
  async getBanUsers(@Res() res: Response): Promise<void> {
    const result = await this.adminService.getBanUsers();

    res.json(result).status(result.code);
  }

  @Get('users')
  async getAllUsers(@Res() res: Response): Promise<void> {
    const result = await this.adminService.getAllUsers();

    res.json(result).status(result.code);
  }
}
