import { IsString, IsNotEmpty, IsUUID, IsUrl, IsIn } from 'class-validator';

export class CreateMemoryDto {
    @IsUUID()
    @IsNotEmpty()
    relativeId: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['IMAGE', 'VIDEO', 'TEXT'])
    type: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;
}
