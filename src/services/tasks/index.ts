import { RequestMod } from '../../common/interfaces/request.mod';
import { Task } from '../../db/entity/Task';
import { CreateTaskDto } from '../../dto/tasks/create-task';
import { UpdateTaskDto } from '../../dto/tasks/update-task';
import { findOneCategoryById } from '../categories';
import { findOneUserById } from '../users';
import { DeleteResult } from 'typeorm';

export const createTask = async (createTaskDto: CreateTaskDto, req: RequestMod): Promise<Task> => {
    const task = new Task();

    // Add category if it exists
    if (createTaskDto.categoryId) {
        task.category = await findOneCategoryById(createTaskDto.categoryId);
        delete createTaskDto.categoryId;
    }

    // Add user
    task.user = await findOneUserById(req.user.userId);

    // Add other properties
    for (const key in createTaskDto) {
        task[key] = createTaskDto[key];
    }
    return task.save().then((task) => {
        delete task.user;
        return task;
    });
};

export const findtasksByUser = (userId: number): Promise<Task[]> => {
    return Task.createQueryBuilder('task').where('task.userId = :userId', { userId }).getMany();
};

export const findOneTaskById = (id: number): Promise<Task> => {
    return Task.findOne({ where: { id } });
};

export const updateTask = (id: number, updateTaskDto: UpdateTaskDto): Promise<Task> => {
    return Task.createQueryBuilder()
        .update(Task)
        .set(updateTaskDto)
        .where('id = :id', { id })
        .execute()
        .then(() => findOneTaskById(id));
};

export const deleteTask = (id: number): Promise<DeleteResult> => {
    return Task.createQueryBuilder().delete().where('id = :id', { id }).execute();
};
