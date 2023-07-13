import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Please provide a valid name.' })
  readonly name: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString({ message: 'Please provide a valid password.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
