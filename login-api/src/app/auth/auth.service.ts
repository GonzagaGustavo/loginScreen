import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user/service';
import { User } from './models/user';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string): User | null {
    console.log('AuthService.validate(email, password)', email, password);
    const user = this.userService.getUserByEmail(email);

    if (!user) return null;

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: User): { access_token: string } {
    console.log('AuthService.login(user)', user);
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string): User {
    console.log('AuthService.verify(token)', token);
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }

  loginByEmail(email: string): { access_token: string } {
    console.log('AuthService.loginByEmail(loginByEmail)', email);
    const user = this.userService.getUserByEmail(email);
    return this.login(user);
  }
}
