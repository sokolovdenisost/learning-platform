import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get(':id/created-courses')
  async getCreatedCoursesByUserId(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.coursesService.getCreatedCoursesByUserId(id);

    res.json(result).status(result.code);
  }

  @Get(':id/take-courses')
  async getTakeCoursesByUserId(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.coursesService.getTakeCoursesByUserId(id);

    res.json(result).status(result.code);
  }

  @Get('')
  async getAllCourses(@Res() res: Response): Promise<void> {
    const result = await this.coursesService.getAllCourses();

    res.json(result).status(result.code);
  }
}
