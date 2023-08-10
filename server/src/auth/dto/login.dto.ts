import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Please provide a valid password.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  readonly password: string;
}
