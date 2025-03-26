import { PaginationDto } from "../../../../shared";

interface Attributes {
    pagination: PaginationDto;
    name?: string;
}
export class FindLinesConfigurationDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return { ...this.attributes }
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, FindLinesConfigurationDto?] {
        const allowedProperties = ["name", "page", "limit"];
        const extraProperties = this.validateExtraProperties(allowedProperties, obj);
        if (extraProperties.length > 0) {
            return [`Extra properties detected: ${extraProperties.join(', ')}`];
        }
        const { page, limit, name } = obj;
        const errorsPropertiesTypes: string[] = [];

        if (name) {
            if (typeof name !== 'string' || name.trim().length < 4) errorsPropertiesTypes.push("'name' must be a string and at least 4 characters long.");
        }
        if (errorsPropertiesTypes.length > 0) {
            return [errorsPropertiesTypes];
        }
        const normalizedName: string = name ? name.trim().toLowerCase() : '';

        const [paginationError, paginationDto] = PaginationDto.create(page, limit);
        if (paginationError) {
            return [paginationError];
        }
        const attributes: Attributes = {
            name: normalizedName,
            pagination: paginationDto!
        }
        return [undefined, new FindLinesConfigurationDto(attributes)]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
}