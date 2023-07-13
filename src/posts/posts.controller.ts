import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/all')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return posts.map((post: PostEntity) => new PostEntity(post));
  }

  @Get('/myPosts')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async getPosts(@Query('id') id: string) {
    const posts = await this.postsService.getMyPosts(+id);
    return posts.map((post: PostEntity) => new PostEntity(post));
  }

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() dto: CreatePostDto, @UploadedFile() image: string) {
    return new PostEntity(
      await this.postsService.createPost({ ...dto, image }),
    );
  }

  @Delete()
  @ApiOkResponse({ type: PostEntity })
  async deletePost(@Query('id') id: string, userId: string) {
    return new PostEntity(await this.postsService.deletePost(+id, +userId));
  }
}
