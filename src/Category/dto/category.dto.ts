
import { Author } from '../../Author/entity/author.entity';
import { Book } from '../../Book/entity/book.entity';
import { IsString, IsOptional, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import {LevelEntity} from "../../Features/difficulty/entity/Level.entity";


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
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LevelEntity)
  level?: LevelEntity;
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
