export class FindLinesConfigurationDto {
    private constructor() { }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, FindLinesConfigurationDto?] {
        return [undefined]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}