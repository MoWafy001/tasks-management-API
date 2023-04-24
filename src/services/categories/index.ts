import { Category } from '../../db/entity/Category';
import { CreateCategoryDto } from '../../dto/categories/create-category';
import { RequestMod } from '../../common/interfaces/request.mod';
import { findOneUserById } from '../users';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from '../../dto/categories/update-category';
import { GetAllQueryDto } from '../../dto/categories/get-all.query';

export const createCategory = async (createCategoryDto: CreateCategoryDto, req: RequestMod): Promise<Category> => {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.user = await findOneUserById(req.user.userId);
    return category.save().then((category) => {
        delete category.user;
        return category;
    });
};

export const findCategoriesByUser = (userId: number, options: GetAllQueryDto = {}): Promise<Category[]> => {
    const query = Category.createQueryBuilder('category').where('category.userId = :userId', { userId });

    if (options.filter) query.andWhere('category.name LIKE :filter', { filter: `%${options.filter}%` });
    if (options.sort) query.orderBy('id', options.sort);
    if (options.limit) query.limit(options.limit);
    if (options.offset) query.offset(options.offset);

    return query.getMany();
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
