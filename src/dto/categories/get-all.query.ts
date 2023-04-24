import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllQueryDto {
    // limit
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    // offset
    @IsOptional()
    @Type(() => Number)
    offset?: number;

    // sort
    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sort?: 'ASC' | 'DESC';

    // filter
    @IsOptional()
    @IsString()
    filter?: string;
}
