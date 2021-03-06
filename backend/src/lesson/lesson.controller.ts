import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AddCommentIdLessonDTO, CreateLessonDTO, DeleteLessonDTO, EditLessonDTO } from './dto/lesson.dto';
import { LessonService } from './lesson.service';
import { Response } from 'express';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post('create-lesson')
  async createLesson(@Res() res: Response, @Body() body: CreateLessonDTO): Promise<void> {
    const result = await this.lessonService.createLesson(body);

    res.json(result).status(result.code);
  }

  @Post('edit-lesson')
  async editLesson(@Res() res: Response, @Body() body: EditLessonDTO): Promise<void> {
    const result = await this.lessonService.editLesson(body);

    res.json(result).status(result.code);
  }

  @Get('edit-lesson/:lesson_id/:user_id')
  async getEditLessonByCourse(@Res() res: Response, @Param() params): Promise<void> {
    const result = await this.lessonService.getEditLessonByCourse(params.lesson_id, params.user_id);

    res.json(result).status(result.code);
  }

  @Post('delete-lesson')
  async deleteLesson(@Res() res: Response, @Body() body: DeleteLessonDTO): Promise<void> {
    const result = await this.lessonService.deleteLesson(body);

    res.json(result).status(result.code);
  }

  @Get(':lesson_id/:user_id')
  async getLessonById(@Res() res: Response, @Param() params: any): Promise<void> {
    const result = await this.lessonService.getLessonById(params.lesson_id, params.user_id);

    res.json(result).status(result.code);
  }

  @Post(':lesson_id/add-comment')
  async addCommentInLesson(@Res() res: Response, @Param('lesson_id') id: string, @Body() body: AddCommentIdLessonDTO): Promise<any> {
    const result = await this.lessonService.addCommentInLesson(id, body);

    res.json(result).status(result.code);
  }
}
