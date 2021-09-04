import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get(':id')
  async getCoursesById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.coursesService.getCoursesById(id);

    res.json(result).status(result.code);
  }
}
