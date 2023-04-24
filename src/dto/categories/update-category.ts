import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category';

export class UpdateCategoryDto extends CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;
}
