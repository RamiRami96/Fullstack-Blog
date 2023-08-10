import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  registration(@Body() dto: RegisterDTO) {
    return this.authService.registration(dto);
  }

  @Post('/signin')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}
