import { Module } from '@nestjs/common';
import { ImagesModule } from 'src/images/images.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [PrismaModule, ImagesModule],
})
export class PostsModule {}
