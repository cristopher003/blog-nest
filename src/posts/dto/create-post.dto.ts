import { IsArray, IsDate, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {



    @IsString()
    @MinLength(1)
    title:string;
    
    @IsString()
    content:string;

    @IsString()
    autor:string;
    
    @IsDate()
    publicationDate:Date;

    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags:string[];

    @IsString({each:true})
    @IsArray()
    @IsOptional()
    categories:string[];

}
