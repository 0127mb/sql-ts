
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';
import { IsString, IsOptional, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCategoryDto {
  @IsString()
  who: string;

  @IsString()
  about: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Author)
  Author: Author;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Book)
  book?: Book[];
}


export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  who?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Author)
  Author?: Author;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Book)
  book?: Book[];
}
