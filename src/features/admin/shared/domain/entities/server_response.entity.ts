import { CustomError } from "./custom_error.entity";

interface ServerResponse {
    status: 'success' | 'error';
    message: string;
    data: any | null;
    error: string | null | string[];
}
export class ServerResponseEntity {
    constructor(
        public readonly status: 'success' | 'error',
        public readonly message: string,
        public readonly data: any | null,
        public readonly error?: string | null | string[]
    ) { }

    public static fromObject(object: ServerResponse): ServerResponseEntity {
        const { status, data, error, message } = object
        if (!status) throw 'status is required'
        if (!['success', 'error'].includes(status)) throw 'Invalid status'
        if (message === undefined) throw CustomError.badRequest('message is required')
        return new ServerResponseEntity(status, message, data, error)
    }
}
