import { Body, Controller, Get, Post, Res, Req, Session, Param, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : null;
    if (token !== undefined) {
      res.json(await this.authService.getAuth(token)).status(200);
    } else {
      res.json({ code: 401, type: 'Error', text: 'Unauthorized' }).status(401);
    }
  }

  @Post('register')
  async registerUser(@Res() res: Response, @Body() body: CreateUserDTO): Promise<void> {
    const result = await this.authService.createUser(body);
    res.json(result).status(result.code);
  }

  @Post('login')
  async loginUser(@Res() res: Response, @Body() body: LoginUserDTO): Promise<void> {
    const result = await this.authService.loginUser(body);
    res.json(result).status(result.code);
  }
}
