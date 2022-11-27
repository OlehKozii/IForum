import {Column} from "typeorm";
import {IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {BanInfo, UserRole} from "../../entities/userModel";

export class signUpDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    nickname:string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password:string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string
}

export class signInDto{

}