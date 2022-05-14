import { Expose } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
export class UpdateBookDTO {


    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsString()
    description? : string;
    
    @Expose()
    @IsString()
    author? : string;

    @IsDate()
    publicationDate? : Date;

    @IsNumber()
    @IsNotEmpty()
    edition? : number
}