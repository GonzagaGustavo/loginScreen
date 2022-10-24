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
import { LocalAuthGuard } from 'src/app/auth/guards/local-auth.guard';
  
  @Controller('user/user')
  export default class UserController extends EntityController<UserEntity> {
    protected config() {
      return { module: 'user', entity: 'user' };
    }
  
    protected facade(): UserFacade {
      return this._facade as UserFacade;
    }
  
    protected filters(req: Request): string[] {
      console.log(req.params)
      const filters = [];
      req.params.email ? filters.push(`user.email='${req.params.email}'`) : null
      return filters;
    }
    
    // @UseGuards(LocalAuthGuard)
    @Get('/email/:email')
    root(@Req() req: Request) {
      const email = req.params.email
      if(!email) throw 'Invalid email'
      const filter = this.query(req, email)
      return this._facade.findOne(filter)
    }
  }
  