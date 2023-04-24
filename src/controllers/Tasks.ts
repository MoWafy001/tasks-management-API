import { NextFunction, Request, Response } from 'express';
import ICRUDController from './interfaces/crud.controller';
import { RequestMod } from '../common/interfaces/request.mod';
import { validateDto } from '../helpers';
import { CreateTaskDto } from '../dto/tasks/create-task';
import { createTask, deleteTask, findOneTaskById, findtasksByUser, updateTask } from '../services/tasks';
import { HttpError } from '../middlewares/error-handling';
import { UpdateTaskDto } from '../dto/tasks/update-task';
import { GetAllQueryDto } from '../dto/categories/get-all.query';

export const TasksController: ICRUDController = {
    create: function (req: RequestMod, res: Response, next: NextFunction): void {
        const createTaskDto = validateDto(CreateTaskDto, req.body);
        createTask(createTaskDto, req)
            .then((category) => res.json(category))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    getAll: function (req: RequestMod, res: Response, next: NextFunction): void {
        const options = validateDto(GetAllQueryDto, req.query);

        findtasksByUser(req.user.userId, options)
            .then((tasks) => res.json(tasks))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    getOne: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        findOneTaskById(id)
            .then((category) => (category ? res.json(category) : next(new HttpError(404, 'Task not found'))))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    update: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        const updateTaskDto = validateDto(UpdateTaskDto, req.body);
        updateTask(id, updateTaskDto)
            .then((result) => res.json(result))
            .catch((err) => next(new HttpError(500, err.message)));
    },

    delete: function (req: Request, res: Response, next: NextFunction): void {
        const id = parseInt(req.params.id);
        deleteTask(id)
            .then((result) => res.json(result))
            .catch((err) => next(new HttpError(500, err.message)));
    },
};
