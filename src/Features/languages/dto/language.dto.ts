
import { Book } from '../../../Book/entity/book.entity';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateLanguageDto {
  @IsString()
  language: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Book)
  book?: Book[];
}


export class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Book)
  book?: Book[];
}
