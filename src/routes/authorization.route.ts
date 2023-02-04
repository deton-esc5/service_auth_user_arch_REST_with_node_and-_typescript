
import { Router, Request, Response, NextFunction} from 'express';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Usuário não informado!');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };
        const jwtSecretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, jwtSecretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        next(error);
    }

});

export default authorizationRoute;