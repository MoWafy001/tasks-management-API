import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task';

export class UpdateTaskDto extends CreateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;
}
