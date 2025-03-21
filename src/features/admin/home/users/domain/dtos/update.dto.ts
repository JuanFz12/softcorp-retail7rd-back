interface Attributes {
    id: number;
}
export class UpdateUserDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, UpdateUserDto?] {
        return [undefined]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}