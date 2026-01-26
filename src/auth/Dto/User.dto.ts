import {IsEmail, IsInt, IsString, MinLength} from "class-validator";
import {Type} from "class-transformer";

export class RegisterUserDto {
    @IsEmail()
    email: string;
    @IsInt()
    @Type(() => Number)
    phoneNumber: number;
    @IsString()
    @MinLength(6)
    password: string;
}