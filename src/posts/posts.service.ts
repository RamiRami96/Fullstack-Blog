import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

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
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    return this.prisma.post.delete({ where: { id } });
  }
}
