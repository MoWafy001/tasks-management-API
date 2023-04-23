import { CreateUserDto } from '../../dto/users/create-user';
import { User } from '../../db/entity/User';
import { hashPassword } from '../../helpers';

export const createUser = (createUserDto: CreateUserDto): Promise<User> => {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashPassword(createUserDto.password);
    console.log(user);

    return user.save();
};

export const findOneById = (userId: number): Promise<User> => {
    return User.findOneOrFail({
        where: {
            id: userId,
        },
    });
};
