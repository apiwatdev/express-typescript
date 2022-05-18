import { Expose, Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateBookDTO {


    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsString()
    description? : string;
    
    @Expose()
    @IsString()
    author? : string;

    @IsNotEmpty()
    @IsDateString()
    publicationDate? : string;

    @IsNumber()
    @IsNotEmpty()
    edition? : number
}