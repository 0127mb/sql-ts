import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {Type} from "class-transformer";

export class RegisterUserDto {
    @IsEmail()
    email: string;
    @IsString()
    @MaxLength(16)
    @Type(type => toString)
    @Matches(/^\+\d{9,15}$/,{message:"number must be +998772980127 format"})
    phoneNumber: string;
    @IsString()
    @MinLength(6)
    password: string;
    @IsString()
    @IsNotEmpty()
    full_name: string;

}