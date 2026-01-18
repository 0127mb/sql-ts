
import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  user_full_name: string;

  @IsOptional()
  @IsEmail()
  user_email?: string;

  @IsOptional()
  @IsNumber()
  user_number?: number;

  @IsString()
  about: string;

  @IsNumber()
  grade: number;
}


export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  user_full_name?: string;

  @IsOptional()
  @IsEmail()
  user_email?: string;

  @IsOptional()
  @IsNumber()
  user_number?: number;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsNumber()
  grade?: number;
}
