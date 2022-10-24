import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './models/user';
import { googleSecret } from './constants';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin() {
    console.log('AuthController.googleLogin()');
  }

  // @UseGuards(GoogleAuthGuard)
  // @Get('google/callback')
  // async googleCallback(@Req() req: Request) {
  //   // console.log(req);
  //   return {
  //     message: 'Opa. Voltou algo.',
  //     user: req.user,
  //   };
  // }

  @Post('google/callback2')
  async googleCallback2(@Req() req: Request) {
    console.log('AuthController.googleCallback2(req)');
    console.log(req.query);
    const { code } = req.query;

    // troca o CODE pelo TOKEN
    const { data } = await axios.post(googleSecret.token_uri, {
      grant_type: 'authorization_code',
      client_id: googleSecret.client_id,
      client_secret: googleSecret.client_secret,
      redirect_uri: 'http://localhost:3000/api/auth/google/callback',
      code: code,
    });

    // com o TOKEN na mão pega o EMAIL do usuário
    const { id_token } = data;
    console.log({ id_token });
    const { email } = jwt_decode(data.id_token) as { email?: string };

    // Com o EMAIL do usuário retorna o TOKEN final
    return this.authService.loginByEmail(email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  user(@CurrentUser() user: User) {
    console.log('AuthController.user(user)', user);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(@CurrentUser() user: User) {
    console.log('AuthController.protected(user)', user);
    return { teste: 'Somente se estiver logado!' };
  }
}
