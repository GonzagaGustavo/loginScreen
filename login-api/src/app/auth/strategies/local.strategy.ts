import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string): User {
    console.log('LocalStrategy.validate(email, password)', email, password);
    const user = this.authService.validate(email, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
