import { Expose } from "class-transformer";
import { IsDate, IsDateString, isEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
export class UpdateBookDto {


    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsString()
    description? : string;
    
    @IsOptional()
    @IsString()
    author? : string;

    @IsNotEmpty()
    @IsDateString()
    publicationDate? : string;

    @IsNumber()
    @IsNotEmpty()
    edition? : number
}