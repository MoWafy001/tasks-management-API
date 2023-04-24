import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error-handling';
import { verifyJWT } from '../services/auth/jwt';
import { RequestMod } from '../common/interfaces/request.mod';
import { IJWTPayload } from '../common/interfaces/jwt-payload';

export const authMiddleware = async (req: RequestMod, res: Response, next: NextFunction) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error('Authorization header is required');

        // Get the token
        const token = authHeader.split(' ')[1];
        if (!token) throw new Error('Access token required');

        // Verify the token
        const decoded: IJWTPayload = verifyJWT(token);

        // Attach the user to the request
        req.user = decoded;

        next();
    } catch (error) {
        next(new HttpError(401, error.message));
    }
};
