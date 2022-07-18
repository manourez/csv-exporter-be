import { IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  Name: string;

  @IsString()
  Phone: string;

  @IsString()
  Number: string;

  @IsString()
  Email: string;
}
