import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('proven-courses')
  async getProvenCourses(@Res() res: Response): Promise<void> {
    const result = await this.coursesService.getProvenCourses();

    res.json(result).status(result.code);
  }

  @Get('untested-courses')
  async getUntestedCourses(@Res() res: Response): Promise<void> {
    const result = await this.coursesService.getUntestedCourses();

    res.json(result).status(result.code);
  }

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

  @Get(':id/favorite-courses')
  async getFavoriteCourses(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.coursesService.getFavoriteCourses(id);

    res.json(result).status(result.code);
  }

  @Get(':id/completed-courses')
  async getCompletedCourses(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.coursesService.getCompletedCourses(id);

    res.json(result).status(result.code);
  }

  @Get('')
  async getAllCourses(@Res() res: Response): Promise<void> {
    const result = await this.coursesService.getAllCourses();

    res.json(result).status(result.code);
  }
}
