import { AvailableScreens, UserRole } from "@prisma/client";
import { CustomError } from "./custom_error.entity";

export interface UserAttributes {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    screens: AvailableScreens[]
}

export class User {
    constructor(
        private readonly attributes: UserAttributes,
    ) { }
    get userAttributes(): UserAttributes {
        return this.attributes;
    }
    static fromObject(object: { [key: string]: any }): User {
        const { role, screens } = object;
        const id = this.validateProperty<number>(object, 'id', 'number');
        const email = this.validateProperty<string>(object, 'email', 'string');
        const name = this.validateProperty<string>(object, 'name', 'string');
        if (!Array.isArray(screens)) throw CustomError.internalServer('screens must be array');
        if (screens.length < 1) throw CustomError.internalServer('screens not empty');
        if (!this.validateEnum(role, UserRole)) {
            throw CustomError.internalServer(`'role' must be a valid value: ${Object.values(UserRole).join(', ')}`);
        }
        screens.forEach(screen => {
            if (!this.validateEnum(screen, AvailableScreens)) {
                throw CustomError.internalServer(`'screen' must be a valid value: ${Object.values(AvailableScreens).join(', ')}`);
            }
        })
        const attributes: UserAttributes = {
            id: +id,
            email: email.trim(),
            name: name.trim(),
            role,
            screens
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
