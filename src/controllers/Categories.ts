import { NextFunction, Request, Response } from 'express';
import ICRUDController from './interfaces/crud.controller';
import { validateDto } from '../helpers';
import { CreateCategoryDto } from '../dto/categories/create-category';
import {
    createCategory,
    deleteCategory,
    findCategoriesByUser,
    findOneCategoryById,
    updateCategory,
} from '../services/categories';
import { HttpError } from '../middlewares/error-handling';
import { RequestMod } from '../common/interfaces/request.mod';
import { UpdateCategoryDto } from '../dto/categories/update-category';
import { GetAllQueryDto } from '../dto/categories/get-all.query';

export const CategoriesController: ICRUDController = {
    create: function (req: RequestMod, res: Response, next: NextFunction): void {
        const createCategoryDto = validateDto(CreateCategoryDto, req.body);
        createCategory(createCategoryDto, req)
            .then((category) => res.status(201).json(category))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    getAll: function (req: RequestMod, res: Response, next: NextFunction): void {
        const options = validateDto(GetAllQueryDto, req.query);

        findCategoriesByUser(req.user.userId, options)
            .then((categories) => res.json(categories))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    getOne: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        findOneCategoryById(id)
            .then((category) => (category ? res.json(category) : next(new HttpError(404, 'Category not found'))))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    update: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        const updateCategoryDto = validateDto(UpdateCategoryDto, req.body);
        updateCategory(id, updateCategoryDto)
            .then((result) => res.json(result))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    delete: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        deleteCategory(id)
            .then((result) => res.json(result))
            .catch((err) => next(new HttpError(500, err.message)));
    },
};
