
import { Author } from '../entities/author.entity';
import { Language } from '../Features/languages/entities/language.entity';
import { Category } from '../entities/category.entity';
import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsString()
  price_now: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Author)
  author: Author;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  languages?: Language[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  category?: Category[];
}


export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  price_now?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Author)
  author?: Author;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  languages?: Language[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  category?: Category[];
}
