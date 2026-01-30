import {Category} from "../../../Category/entity/category.entity";
import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested} from "class-validator";
import {Type} from "class-transformer";


export class CreateDto {
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => Category)
    category: Category;
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    difficulty: string;


}