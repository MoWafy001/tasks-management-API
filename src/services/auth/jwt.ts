import { sign, verify } from 'jsonwebtoken';
import { User } from '../../db/entity/User';
import config from '../../config';

export const signJWT = (user: User) => {
    return sign(
        {
            userId: user.id,
            email: user.email,
            name: user.name,
        },
        config.JWT.secret,
        { expiresIn: config.JWT.expiresIn },
    );
};

export const verifyJWT = (token: string) => {
    return verify(token, config.JWT.secret);
};
