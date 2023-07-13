import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

interface User extends RegisterDTO {
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: RegisterDTO) {
    if (!dto.email) throw new ForbiddenException('Email has not been found');

    const candidate = await this.userService.getUser(dto.email);

    if (candidate)
      throw new ForbiddenException('Candidate with this email already exists');

    const hashPassword = await bcrypt.hash(dto.password, 7);

    const user: User = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDTO) {
    const user = await this.userService.getUser(dto.email);
    let equalPassword: boolean;

    if (user) {
      equalPassword = await bcrypt.compare(dto.password, user.password);
    }

    if (!user && !equalPassword) {
      throw new UnauthorizedException('Email or password is not correct');
    }

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const { id, name, email } = user;
    const payload = { id, name, email };
    return { token: this.jwtService.sign(payload) };
  }
}
