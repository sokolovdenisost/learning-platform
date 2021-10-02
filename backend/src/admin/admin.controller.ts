import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('delete-images')
  async deleteImagesDontUse(@Res() res: Response): Promise<void> {
    const result = await this.adminService.deletesImageDontUse();

    res.json(result).status(result.code);
  }
}
