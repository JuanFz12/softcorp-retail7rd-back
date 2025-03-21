interface Attributes {
    name: string;
}
export class CreateLineConfigurationDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, CreateLineConfigurationDto?] {
        const { name } = obj;
        if (!name) return ["Missing 'name' property"];
        const attributes: Attributes = {
            name
        }
        return [undefined, new CreateLineConfigurationDto(attributes)]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}