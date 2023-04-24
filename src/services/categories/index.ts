import { Category } from '../../db/entity/Category';
import { CreateCategoryDto } from '../../dto/categories/create-category';
import { RequestMod } from '../../common/interfaces/request.mod';
import { findOneUserById } from '../users';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from '../../dto/categories/update-category';

export const createCategory = async (createCategoryDto: CreateCategoryDto, req: RequestMod): Promise<Category> => {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.user = await findOneUserById(req.user.userId);
    return category.save();
};

export const findCategoriesByUser = (userId: number): Promise<Category[]> => {
    return Category.createQueryBuilder('category').where('category.userId = :userId', { userId }).getMany();
};

export const findOneCategoryById = (id: number): Promise<Category> => {
    return Category.findOne({ where: { id } });
};

export const updateCategory = (id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> => {
    return Category.createQueryBuilder()
        .update(Category)
        .set({
            name: updateCategoryDto.name,
        })
        .where('id = :id', { id })
        .execute()
        .then(() => findOneCategoryById(id));
};

export const deleteCategory = (id: number): Promise<DeleteResult> => {
    return Category.createQueryBuilder().delete().where('id = :id', { id }).execute();
};
