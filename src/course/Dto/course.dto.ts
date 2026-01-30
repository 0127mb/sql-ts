
import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  price_now?: string;

  @IsString()
  category: string;

  @IsString()
  about: string;

  @IsString()
  way: string;
}


export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  price_now?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  way?: string;
}
