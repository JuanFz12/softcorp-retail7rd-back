import { UserRole } from "@prisma/client";
import { RegularExpressions } from "../../../../../../config";

interface Attributes {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    language: string;
}
export class CreateUserDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, CreateUserDto?] {
        const allowedProperties = ["name", "email", "password", "role", "language"];
        const extraProperties = this.validateExtraProperties(allowedProperties, obj);
        const errorsProperties: string[] = [];
        const errorsPropertiesTypes: string[] = [];
        if (extraProperties.length > 0) {
            return [`Extra properties detected: ${extraProperties.join(', ')}`];
        }
        const { name, email, password, role, language } = obj
        if (!name) errorsProperties.push('Missing name');
        if (!email) errorsProperties.push('Missing email');
        if (!password) errorsProperties.push('Missing password');
        if (!role) errorsProperties.push('Missing role');
        if (!language) errorsProperties.push('Missing language');
        if (errorsProperties.length > 0) {
            return [errorsProperties];
        }
        if (typeof name !== 'string') errorsPropertiesTypes.push("'name' must be string")
        if (typeof language !== 'string') errorsPropertiesTypes.push("'language' must be string")
        if (!RegularExpressions.validateEmail(email)) errorsPropertiesTypes.push('Invalid format email');
        if (!RegularExpressions.validatePassword(password)) errorsPropertiesTypes.push('Invalid format password');
        if (!this.validateEnum(role, UserRole)) {
            errorsPropertiesTypes.push(`'role' must be a valid value: ${Object.values(UserRole).join(', ')}`);
        }
        if (errorsPropertiesTypes.length > 0) {
            return [errorsPropertiesTypes];
        }

        const attributes: Attributes = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            role,
            language: language.trim()
        }
        return [undefined, new CreateUserDto(attributes)]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
    private static validateEnum<T extends Record<string, string | number>>(value: any, enumObject: T): boolean {
        return Object.values(enumObject).includes(value);
    }
}