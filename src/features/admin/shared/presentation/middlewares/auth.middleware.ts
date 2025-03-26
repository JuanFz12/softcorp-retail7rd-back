import { NextFunction, Request, Response } from "express";
import { CustomError, ServerResponseEntity } from "../../domain";
import { JwtPlugin, prisma } from "../../../../../config";

export class AuthMiddleware {
    static async validateJwtUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authorization = req.header('Authorization');

        if (!authorization) {
            res.status(401).json(
                ServerResponseEntity.fromObject({
                    status: 'error',
                    message: 'An error occurred while processing the request.',
                    data: null,
                    error: 'No token provider'
                })
            );
            return;
        }

        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json(
                ServerResponseEntity.fromObject({
                    status: 'error',
                    message: 'An error occurred while processing the request.',
                    data: null,
                    error: 'Invalid Bearer token'
                })
            );
            return;
        }

        const token = authorization.split(' ').at(1) ?? '';
        try {
            const payload = await JwtPlugin.validatedToken<{ id: string }>(token);
            if (!payload) {
                res.status(401).json(
                    ServerResponseEntity.fromObject({
                        status: 'error',
                        message: 'An error occurred while processing the request.',
                        data: null,
                        error: 'Invalid token'
                    })
                );
                return;
            }

            const user = await prisma.user.findUnique({ where: { id: +payload.id } });
            if (!user) {
                res.status(401).json(
                    ServerResponseEntity.fromObject({
                        status: 'error',
                        message: 'An error occurred while processing the request.',
                        data: null,
                        error: 'Invalid token'
                    })
                );
                return;
            }
            req.body.user = { id: user.id }
            next();
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal server error');
        }
    }
}