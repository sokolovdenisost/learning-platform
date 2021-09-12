import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CourseService } from './course.service';
import {
  CreateCourseDTO,
  CreateLessonDTO,
  DeleteCourseDTO,
  DeleteLessonDTO,
  EditCourseDTO,
  EditLessonDTO,
  FavoriteCourseDTO,
  RatingForCourseDTO,
} from './dto/course.dto';

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
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(@Res() res: Response, @Body() body: CreateCourseDTO, @UploadedFile('file') file: Express.Multer.File): Promise<void> {
    console.log(body);
    const result = await this.courseService.createCourse(body, file);

    res.json(result).status(result.code);
  }

  @Post('edit-course/:id')
  async editCourse(@Res() res: Response, @Body() body: EditCourseDTO, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.editCourseById(body, id);

    res.json(result).status(result.code);
  }

  @Post('create-lesson')
  async createLesson(@Res() res: Response, @Body() body: CreateLessonDTO): Promise<void> {
    const result = await this.courseService.createLesson(body);

    res.json(result).status(result.code);
  }

  @Post('edit-lesson')
  async editLesson(@Res() res: Response, @Body() body: EditLessonDTO): Promise<void> {
    const result = await this.courseService.editLesson(body);

    res.json(result).status(result.code);
  }

  @Get(':id/edit-lesson/:lesson')
  async getLessonByCourse(@Res() res: Response, @Param() params): Promise<void> {
    const result = await this.courseService.getLessonByCourse(params.id, params.lesson);

    res.json(result).status(result.code);
  }

  @Get('/lesson/:id')
  async getLessonById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.getLessonById(id);

    res.json(result).status(result.status);
  }

  @Post('delete-lesson')
  async deleteLesson(@Res() res: Response, @Body() body: DeleteLessonDTO): Promise<void> {
    const result = await this.courseService.deleteLesson(body);

    res.json(result).status(result.code);
  }

  @Post('/favorite')
  async toggleFavoriteCourse(@Res() res: Response, @Body() body: FavoriteCourseDTO): Promise<void> {
    const result = await this.courseService.toggleFavorite(body);

    res.json(result).status(result.code);
  }

  @Post('/rating/:id')
  async setRatingForCourse(@Res() res: Response, @Body() body: RatingForCourseDTO, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.ratingForCourse(body, id);

    res.json(result).status(result.code);
  }

  @Post(':id')
  async deleteCourse(@Res() res: Response, @Param('id') id: string, @Body() body: DeleteCourseDTO): Promise<void> {
    const result = await this.courseService.deleteCourse(id, body.user_id);

    res.json(result).status(result.code);
  }
}
