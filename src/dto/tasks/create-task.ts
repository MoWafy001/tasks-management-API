import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusTypes } from '../../db/entity/Task';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(StatusTypes)
    status: StatusTypes;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}
