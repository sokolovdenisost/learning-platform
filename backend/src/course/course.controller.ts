import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateCourseDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    return;
  }

  @Post('create')
  async createCourse(@Res() res: Response, @Body() body: CreateCourseDTO): Promise<void> {
    return;
  }

  @Post('create-lesson')
  async createLesson(@Res() res: Response, @Body() body): Promise<void> {
    return;
  }
}
