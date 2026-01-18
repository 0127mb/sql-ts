
import { User } from '../../Users/entities/User.entity';
import { IsBoolean, IsNumber, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateFavoriteDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsBoolean()
  is_liked: boolean;

  @IsNumber()
  count: number;
}


export class UpdateFavoriteDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user?: User;

  @IsOptional()
  @IsBoolean()
  is_liked?: boolean;

  @IsOptional()
  @IsNumber()
  count?: number;
}
