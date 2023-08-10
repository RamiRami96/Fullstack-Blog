import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  getUser(@Query('email') email: string) {
    return this.userService.getUser(email);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: UserEntity })
  createUser(userDTO: CreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  updateUser(
    @Query('email') email: string,
    @Body() updatedUserDTO: CreateUserDTO,
  ) {
    return this.userService.updateUser(email, updatedUserDTO);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  deleteUser(email: string) {
    return this.userService.deleteUser(email);
  }
}
