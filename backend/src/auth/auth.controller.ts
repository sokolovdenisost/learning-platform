import { Body, Controller, Get, Post, Res, Req, Session } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user_id = req.get('authorization').split(' ')[1];
    if (user_id) {
      res.json(await this.authService.findUserById(user_id)).status(200);
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
