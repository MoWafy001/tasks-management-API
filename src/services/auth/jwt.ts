import { sign, verify } from 'jsonwebtoken';
import { User } from '../../db/entity/User';
import config from '../../config';
import { IJWTPayload } from '../../common/interfaces/jwt-payload';

export const signJWT = (user: User) => {
    const payload: IJWTPayload = {
        userId: user.id,
        email: user.email,
        name: user.name,
    };
    return sign(payload, config.JWT.secret, { expiresIn: config.JWT.expiresIn });
};

export const verifyJWT = (token: string): IJWTPayload => {
    // @ts-ignore
    return verify(token, config.JWT.secret);
};
