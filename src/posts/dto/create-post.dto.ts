import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title should be at least 5 characters long' })
  @ApiProperty({ description: 'Title of the post (minimum 5 characters)' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  @MaxLength(300, { message: 'Content should not exceed 300 characters' })
  @ApiProperty({ description: 'Content of the post (maximum 300 characters)' })
  readonly content: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image: string;

  @ApiProperty({ description: 'Id of user' })
  readonly userId: number;
}
