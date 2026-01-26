

import { IsBoolean, IsNumber, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
// import {User} from "../../../auth/entites/User.entity";


export class CreateFavoriteDto {
  // @IsObject()
  // @ValidateNested()
  // @Type(() => User)
  // user: User;

  @IsBoolean()
  is_liked: boolean;

  @IsNumber()
  count: number;
}


export class UpdateFavoriteDto {
  // @IsOptional()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => User)
  // user?: User;

  @IsOptional()
  @IsBoolean()
  is_liked?: boolean;

  @IsOptional()
  @IsNumber()
  count?: number;
}
