import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import UserModule from './user';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
