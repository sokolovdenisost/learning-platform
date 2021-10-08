import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('notifications/:id')
  async getNotifications(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.userService.getNotifications(id);
    res.json(result).status(result.code);
  }

  @Get(':id')
  async getUser(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.userService.getUserById(id);
    res.json(result).status(result.code);
  }
}
