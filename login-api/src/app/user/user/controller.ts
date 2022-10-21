import {
    Body,
    Controller,
    Get,
    Post,
    Render,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { Request } from 'express';
  import UserFacade from './facade';
  import UserEntity from './entity';
  import EntityController from 'src/lib/elisa/controller/entity';
  import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
  // import EntityService from 'src/libraries/eliti/service/entity';
  
  @Controller('user/user')
  export default class UserController extends EntityController<UserEntity> {
    protected config() {
      return { module: 'user', entity: 'user' };
    }
  
    protected facade(): UserFacade {
      return this._facade as UserFacade;
    }
  
    protected filters(req: Request): string[] {
      const filters = [];
      return filters;
    }
  
    @UseGuards(JwtAuthGuard)
  }
  