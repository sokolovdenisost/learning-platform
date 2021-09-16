import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CourseService } from './course.service';
import { CreateCourseDTO, DeleteCourseDTO, EditCourseDTO, FavoriteCourseDTO, JoinCourseDTO, RatingForCourseDTO } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':id')
  async getCourseById(@Res() res: Response, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.getCourseById(id);
    res.json(result).status(result.code);
  }

  @Get('edit/:id/:user_id')
  async getCourseByIdAndUserId(@Res() res: Response, @Param() params): Promise<void> {
    const result = await this.courseService.getCourseByIdAndUserId(params.id, params.user_id);
    res.json(result).status(result.code);
  }

  @Post('join')
  async joinCourse(@Res() res: Response, @Body() body: JoinCourseDTO): Promise<void> {
    const result = await this.courseService.joinCourse(body);

    res.json(result).status(result.code);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(@Res() res: Response, @Body() body: CreateCourseDTO, @UploadedFile('file') file: Express.Multer.File): Promise<void> {
    const result = await this.courseService.createCourse(body, file);

    res.json(result).status(result.code);
  }

  @Post('edit-course/:id')
  async editCourse(@Res() res: Response, @Body() body: EditCourseDTO, @Param('id') id: string): Promise<void> {
    const result = await this.courseService.editCourseById(body, id);

    res.json(result).status(result.code);
  }

  @Post('favorite')
  async toggleFavoriteCourse(@Res() res: Response, @Body() body: FavoriteCourseDTO): Promise<void> {
    const result = await this.courseService.toggleFavorite(body);

    res.json(result).status(result.code);
  }

  @Post('rating/:id')
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
