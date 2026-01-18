
import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsOptional()
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
