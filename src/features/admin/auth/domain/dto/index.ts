import { RegularExpressions } from "../../../../../config";

export class LoginDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }

    static create(obj: Record<string, any>): [string[] | string | undefined, LoginDto?] {
        const allowedProperties = ['email', 'password'];
        const extraProperties = this.validateExtraProperties(allowedProperties, obj);
        const errorsProperties: string[] = [];
        const errorsPropertiesTypes: string[] = [];
        if (extraProperties.length > 0) {
            return [`Extra properties detected: ${extraProperties.join(', ')}`];
        }
        if (!obj.email) errorsProperties.push(`Missing 'email' argument in login action`);
        if (!obj.password) errorsProperties.push(`Missing 'password' argument in login action`);
        if (errorsProperties.length > 0) {
            return [errorsProperties];
        }

        if (!RegularExpressions.validateEmail(obj.email)) errorsPropertiesTypes.push(`Invalid email format: ${obj.email}`);
        if (!RegularExpressions.validatePassword(obj.password)) errorsPropertiesTypes.push('Password does not meet the required format');
        if (errorsPropertiesTypes.length > 0) {
            return [errorsPropertiesTypes];
        }
        return [undefined, new LoginDto(obj.email, obj.password)];
    }
}
