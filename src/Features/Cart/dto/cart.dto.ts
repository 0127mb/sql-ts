
import { Book } from '../../../entities/book.entity';
import { IsBoolean, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateCartDto {
  @IsBoolean()
  is_active: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => Book)
  book: Book;
}


export class UpdateCartDto {
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Book)
  book?: Book;
}
