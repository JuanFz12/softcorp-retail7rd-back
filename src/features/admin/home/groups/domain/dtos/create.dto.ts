interface Attributes {
    name: string;
    linesConfigurationIds: number[];
}
export class CreateGroupDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, CreateGroupDto?] {
        const allowedProperties: string[] = ["name", "linesConfigurationIds"];
        const extraProperties = this.validateExtraProperties(allowedProperties, obj);
        const errorsProperties: string[] = [];
        const errorsPropertiesTypes: string[] = [];
        if (extraProperties.length > 0) {
            return [`Extra properties detected: ${extraProperties.join(', ')}`];
        }
        const { name, linesConfigurationIds } = obj
        if (linesConfigurationIds === undefined) errorsProperties.push('Missing linesConfigurationIds');
        if (!name) errorsProperties.push('Missing name');
        if (errorsProperties.length > 0) {
            return [errorsProperties];
        }

        if (typeof name !== 'string') errorsPropertiesTypes.push("'name' must be string")

        if (!Array.isArray(linesConfigurationIds) || linesConfigurationIds.length < 1) {
            return ["'groups' must be an array and not empty"]
        }
        if (!linesConfigurationIds.every((g: any) => typeof g === 'number' && g > 0)) {
            return ["'groups' must be an array of positive numbers"];
        }

        const uniqueIds = [...new Set(linesConfigurationIds)];
        if (uniqueIds.length !== linesConfigurationIds.length) {
            return ["'linesConfigurationIds' must contain unique values"];
        }
        const attributes: Attributes = {
            name: name.trim(),
            linesConfigurationIds:uniqueIds
        }
        return [undefined, new CreateGroupDto(attributes)]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}