interface Attributes {
    id: number;
}
export class UpdateGroupDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, UpdateGroupDto?] {
        return [undefined]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}