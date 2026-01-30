
import { IsNumber, IsOptional, IsString } from "class-validator";
import {Type} from "class-transformer";


export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  authorId?: number;
}


export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  authorId?: number;
}
