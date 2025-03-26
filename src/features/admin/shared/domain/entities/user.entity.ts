import { UserRole } from "@prisma/client";
import { CustomError } from "./custom_error.entity";

export interface UserAttributes {
    id: number;
    email: string;
    name: string;
    role: UserRole;
}

export class User {
    constructor(
        private readonly attributes: UserAttributes,
    ) { }
    get userAttributes(): UserAttributes {
        return this.attributes;
    }
    static fromObject(object: { [key: string]: any }): User {
        const id = this.validateProperty<number>(object, 'id', 'number');
        const email = this.validateProperty<string>(object, 'email', 'string');
        const name = this.validateProperty<string>(object, 'name', 'string');
        const role = this.validateProperty<UserRole>(object, 'role', 'string');
        if (!this.validateEnum(role, UserRole)) {
            throw CustomError.internalServer(`'role' must be a valid value: ${Object.values(UserRole).join(', ')}`);
        }
        const attributes: UserAttributes = {
            id: +id,
            email: email.trim(),
            name: name.trim(),
            role
        }
        return new User(attributes);
    }

    static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in ${this.name}`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (${this.name})`);
        }
        return object[propertyName];
    }
    protected static validateEnum<T extends Record<string, string | number>>(value: any, enumObject: T): boolean {
        return Object.values(enumObject).includes(value);
    }
}
