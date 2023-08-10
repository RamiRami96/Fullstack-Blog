import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @ApiProperty()
  @IsString({ message: 'Please provide a valid name.' })
  readonly name: string;
}
