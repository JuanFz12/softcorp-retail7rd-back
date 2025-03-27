import { UserRole } from "@prisma/client";
import { CustomError, Named } from "../../../../shared";
interface UserManagementAttributes {
    id: number;
    name: string;
    role: UserRole
    language: string;
    groups: Named[];
    configurations: number;
    isActive: boolean;
}
export class UserManagement {
    constructor(
        private readonly attributes: UserManagementAttributes
    ) { }
    get userManagementAttributes(): UserManagementAttributes {
        return this.attributes;
    }

    static fromObject(object: Record<string, any>): UserManagement {
        const { role, groups } = object
        const id = this.validateProperty<number>(object, 'id', 'number')
        const name = this.validateProperty<string>(object, 'name', 'string')
        const language = this.validateProperty<string>(object, 'language', 'string')
        const configurations = this.validateProperty<number>(object, 'configurations', 'number')
        const isActive = this.validateProperty<boolean>(object, 'isActive', 'boolean')
        if (!this.validateEnum(role, UserRole)) {
            throw CustomError.internalServer(`'role' must be a valid value: ${Object.values(UserRole).join(', ')}`);
        }
        if (!Array.isArray(groups)) {
            throw CustomError.internalServer(`'groups' must be an array.`);
        }
        const validatedGroups = groups.map((group, index) =>
            this.validateNamed(group, `groups[${index}]`)
        );

        const attributes: UserManagementAttributes = {
            id: +id,
            name: name.trim(),
            role,
            language: language.trim(),
            groups: validatedGroups,
            configurations: +configurations,
            isActive
        }
        return new UserManagement(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in UserManagement`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (UserManagement )`);
        }
        return object[propertyName];
    }
    private static validateNamed(named: any, propertyName: string): Named {
        if (!named || typeof named !== 'object') {
            throw CustomError.internalServer(`The '${propertyName}' must be an object with 'id' and 'name'.`);
        }
        const id = this.validateProperty<number>(named, 'id', 'number');
        const name = this.validateProperty<string>(named, 'name', 'string');
        return { id, name };
    }
    private static validateEnum<T extends Record<string, string | number>>(value: any, enumObject: T): boolean {
        return Object.values(enumObject).includes(value);
    }
}