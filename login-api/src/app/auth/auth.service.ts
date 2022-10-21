import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '../user/user/service';
import { User } from './models/user';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validate(email: string, password: string): User | null {
        
    }
}
