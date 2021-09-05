import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { CreateCourseDTO, CreateLessonDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.getCourseById(id);
    res.json(result).status(result.code);
  }

  @Post('create')
  async createCourse(@Res() res: Response, @Body() body: CreateCourseDTO): Promise<void> {
    const result = await this.courseService.createCourse(body);

    res.json(result).status(result.code);
  }

  @Post('create-lesson')
  async createLesson(@Res() res: Response, @Body() body: CreateLessonDTO): Promise<void> {
    const result = await this.courseService.createLesson(body);

    res.json(result).status(result.code);
  }

  @Delete(':id')
  async deleteCourse(@Res() res: Response, @Param('id') id: string): Promise<void> {
    // нужно проверять что его удаляет точно создатель курса
    const result = await this.courseService.deleteCourse(id);

    res.json(result).status(result.code);
  }
}
