import { Expose } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
export class UpdateBookDTO {


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