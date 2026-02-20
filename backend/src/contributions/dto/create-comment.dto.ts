import { IsString, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @IsUUID()
    @IsNotEmpty()
    relativeId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    author: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(500)
    text: string;
}
