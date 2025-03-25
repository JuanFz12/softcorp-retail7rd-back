import { NextFunction, Request, Response } from "express";
import { ServerResponseEntity } from "../../domain";

export class FileUploadMiddleware {
    static simpleContainFiles(req: Request, res: Response, next: NextFunction) {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json(ServerResponseEntity.fromObject({
                data: null,
                error: 'No files were selected',
                message: 'This endpoint requires upload files',
                status: 'error'
            }))
            return;
        }
        if (!Array.isArray(req.files.file)) {
            req.body.files = [req.files.file]
        } else {
            req.body.files = req.files.file
        }
        next();
    }

    static keysContainFiles(req: Request, res: Response, next: NextFunction) {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json(ServerResponseEntity.fromObject({
                data: null,
                error: 'No files were selected',
                message: 'This endpoint requires upload files',
                status: 'error'
            }))
            return;
        }
        if (!Array.isArray(req.files)) {
            req.body.files = req.files
        } else {
            req.body.files = req.files
        }
        next()
    }
}