import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { CreateCourseDTO, CreateLessonDTO, DeleteCourseDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.getCourseById(id);
    res.json(result).status(result.code);
  }

  @Get('/edit/:id/:user_id')
  async getCourseByIdAndUserId(@Res() res: Response, @Param() params): Promise<void> {
    const result = await this.courseService.getCourseByIdAndUserId(params.id, params.user_id);
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

  @Get(':id/edit-lesson/:lesson')
  async getLessonByCourse(@Res() res: Response, @Param() params): Promise<void> {
    const result = await this.courseService.getLessonByCourse(params.id, params.lesson);

    res.json(result).status(result.code);
  }

  @Post(':id')
  async deleteCourse(@Res() res: Response, @Param('id') id: string, @Body() body: DeleteCourseDTO): Promise<void> {
    // нужно проверять что его удаляет точно создатель курса
    const result = await this.courseService.deleteCourse(id, body.user_id);

    res.json(result).status(result.code);
  }
}
