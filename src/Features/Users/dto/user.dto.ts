
import { Favorite } from '../../favorites/entities/favorite.entity';
import { IsString, IsOptional, IsNumber, IsObject, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateUserDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Favorite)
  favorite?: Favorite;

  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  password_confirmation?: string;

  @IsNumber()
  phone_number: number;
}


export class UpdateUserDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Favorite)
  favorite?: Favorite;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  password_confirmation?: string;

  @IsOptional()
  @IsNumber()
  phone_number?: number;
}
