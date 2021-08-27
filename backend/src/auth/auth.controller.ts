import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getAuth(@Res() res: Response, @Session() session): Promise<void> {
    console.log(session);
    if (session.user) {
      res.json(await this.authService.findUserById(session.user._id)).status(200);
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
  async loginUser(@Res() res: Response, @Body() body: LoginUserDTO, @Session() session): Promise<void> {
    const result = await this.authService.loginUser(body, session);
    res.json(result).status(result.code);
  }
}
