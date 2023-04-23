import { Router } from 'express';
import ICRUDController from '../controllers/interfaces/crud.controller';
import { plainToClassFromExist } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';
import { HttpError } from '../middlewares/error-handling';
import bcrypt from 'bcrypt';
import config from '../config';

export const setCRUDRoutes = (router: Router, controller: ICRUDController, prefix: string = '/') => {
    router.post(prefix, controller.create);
    router.get(prefix, controller.getAll);
    router.get(prefix + ':id', controller.getOne);
    router.patch(prefix + ':id', controller.update);
    router.delete(prefix + ':id', controller.delete);
};

// validate DTO
export const validateDto = (DtoClass: any, body: any) => {
    const createItemDto = plainToClassFromExist(new DtoClass(), body);
    let errors = validateSync(createItemDto);
    console.log(errors);

    if (errors.length > 0) {
        errors = formatDtoValidationErrors(errors);

        throw new HttpError(400, {
            errors: errors,
        });
    }
    return createItemDto;
};

const formatDtoValidationErrors = (errors: ValidationError[]) => {
    return errors.map((error) => {
        const { property, constraints } = error;

        const out: any = {};
        out[property] = Object.values(constraints);
        return out;
    });
};

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, config.bcrypt.saltRounds);
};

export const comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
};
