import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImagesService,
  ) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async getMyPosts(id: number) {
    return this.prisma.post.findMany({ where: { userId: id } });
  }

  getPost(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async createPost(dto: CreatePostDto) {
    const fileName = await this.imageService.createFile(dto.image);
    return this.prisma.post.create({
      data: {
        ...dto,
        image: fileName,
        userId: Number(dto.userId),
      },
    });
  }

  async deletePost(id: number, userId: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.userId !== userId) {
        throw new ForbiddenException('You are not allowed to delete this post');
      }

      const deletePath = join(process.cwd(), '/static', post.image);
      console.log(deletePath);

      await fs.unlink(deletePath);

      return this.prisma.post.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }
}
