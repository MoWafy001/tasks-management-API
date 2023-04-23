import { NextFunction, Request, Response } from 'express';
import { validateDto } from '../helpers';
import { CreateUserDto } from '../dto/users/create-user';
import { createUser } from '../services/users';
import { HttpError } from '../middlewares/error-handling';

export const UsersController = {
    create: function (req: Request, res: Response, next: NextFunction): void {
        const body: CreateUserDto = validateDto(CreateUserDto, req.body);
        createUser(body)
            .then((user) => res.json(user))
            .catch((err) => {
                next(new HttpError(500, err.message));
            });
    },

    getLoggedInUser: function (req: Request, res: Response): void {
        res.send('get logged in user');
    },
};
