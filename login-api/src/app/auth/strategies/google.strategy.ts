import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import UserService from '../../user/user/service';
import { User } from '../models/user';
import { googleSecret } from '../constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    // private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: googleSecret.client_id,
      clientSecret: googleSecret.client_secret,
      callbackURL: googleSecret.redirect_uris[0],
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log('GoogleStrategy.validate()');

    const { emails } = profile;
    const email = emails[0].value;

    const user = this.userService.getUserByEmail(email);
    done(null, user);
    console.log({ user });
    return user;
  }
}
