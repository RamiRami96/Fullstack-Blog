import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
