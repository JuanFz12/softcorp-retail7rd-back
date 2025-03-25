import { LineConfigurationType, LineConfigurationViewType } from "@prisma/client";
import { UploadedFile } from 'express-fileupload'
interface Attributes {
    name: string;
    lineType: LineConfigurationType
    viewType: LineConfigurationViewType
    themeId: number;
    userId: number;
    alternativeEquipmentCode: boolean;
    timeZone: string;
    tournamentIds: number[];
    sportIds: number[];
    championshipIds: number[];
    groupIds: number[];
    showAdvertisingEvery: string;
    advertisingImage: UploadedFile;
    images: { name: string; file: UploadedFile }[];
}
export class CreateLineConfigurationDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, CreateLineConfigurationDto?] {
        const allowedProperties: string[] = ["name", "lineType", "userId", "images", "themeId", "viewType", "advertisingImage", "showAdvertisingEvery", "alternativeEquipmentCode", "timeZone", "tournamentIds", "sportIds", "championshipIds", "groupIds",];
        const extraProperties = this.validateExtraProperties(allowedProperties, obj);
        if (extraProperties.length > 0) {
            return [`Extra properties detected: ${extraProperties.join(', ')}`];
        }
        const errorsProperties: string[] = [];
        const { name, lineType, themeId, viewType, alternativeEquipmentCode, timeZone, userId, images, tournamentIds, advertisingImage, sportIds, championshipIds, groupIds, showAdvertisingEvery } = obj;
        if (!name) errorsProperties.push("Missing 'name' property");
        if (!timeZone) errorsProperties.push("Missing 'timeZone' property");
        if (!lineType) errorsProperties.push("Missing 'lineType' property");
        if (!showAdvertisingEvery) errorsProperties.push("Missing 'showAdvertisingEvery' property");
        if (themeId === undefined) errorsProperties.push("Missing 'themeId' property");
        if (userId === undefined) errorsProperties.push("Missing 'userId' property");
        if (images === undefined) errorsProperties.push("Missing 'images' property");
        if (tournamentIds === undefined) errorsProperties.push("Missing 'tournamentIds' property");
        if (sportIds === undefined) errorsProperties.push("Missing 'sportIds' property");
        if (championshipIds === undefined) errorsProperties.push("Missing 'championshipIds' property");
        if (advertisingImage === undefined) errorsProperties.push("Missing 'advertisingImage' property");
        if (groupIds === undefined) errorsProperties.push("Missing 'groupIds' property");
        if (alternativeEquipmentCode === undefined) errorsProperties.push("Missing 'alternativeEquipmentCode' property");
        if (!viewType) errorsProperties.push("Missing 'viewType' property");
        if (errorsProperties.length > 0) {
            return [errorsProperties];
        }
        const errorsPropertiesTypes: string[] = [];

        if (typeof name !== 'string') errorsPropertiesTypes.push("'name' must be string")
        if (typeof showAdvertisingEvery !== 'string') errorsPropertiesTypes.push("'showAdvertisingEvery' must be string")
        if (!this.isValidTimeZone(timeZone)) errorsPropertiesTypes.push("'timeZone' is not a valid value")
        if (typeof alternativeEquipmentCode !== 'boolean') errorsPropertiesTypes.push("'alternativeEquipmentCode' must be boolean")
        if (isNaN(themeId) || +themeId < 1) errorsPropertiesTypes.push("'themeId' must be positive number");
        if (isNaN(userId) || +userId < 1) errorsPropertiesTypes.push("'userId' must be positive number");
        if (!this.validateEnum(lineType, LineConfigurationType)) {
            errorsPropertiesTypes.push(`'lineType' must be a valid value: ${Object.values(LineConfigurationType).join(', ')}`);
        }
        if (!this.validateEnum(viewType, LineConfigurationViewType)) {
            errorsPropertiesTypes.push(`'viewType' must be a valid value: ${Object.values(LineConfigurationViewType).join(', ')}`);
        }
        const arrayFields = ["tournamentIds", "sportIds", "championshipIds", "groupIds"];

        for (const field of arrayFields) {
            const error = this.validateNumberArray(field, obj[field]);
            if (error) errorsPropertiesTypes.push(error);
        }
        const fileError = this.validateUploadedFile("advertisingImage", advertisingImage);
        if (fileError) errorsPropertiesTypes.push(fileError);

        const imagesError = this.validateImageArray("images", obj.images);
        if (imagesError) errorsPropertiesTypes.push(imagesError);
        if (errorsPropertiesTypes.length > 0) {
            return [errorsPropertiesTypes];
        }
        const attributes: Attributes = {
            name: name.trim(),
            lineType,
            themeId: +themeId,
            userId: +userId,
            advertisingImage,
            viewType,
            timeZone: timeZone.trim(),
            alternativeEquipmentCode,
            tournamentIds,
            sportIds,
            championshipIds,
            images,
            groupIds,
            showAdvertisingEvery: showAdvertisingEvery.trim()
        }
        return [undefined, new CreateLineConfigurationDto(attributes)]
    }
    private static validateExtraProperties(allowedProperties: string[], obj: Record<string, any>): string[] {
        const receivedProperties = Object.keys(obj);
        const extraProperties = receivedProperties.filter(prop => !allowedProperties.includes(prop));
        return extraProperties;
    }
    private static validateEnum<T extends Record<string, string | number>>(value: any, enumObject: T): boolean {
        return Object.values(enumObject).includes(value);
    }
    private static validateNumberArray(fieldName: string, value: any): string | undefined {
        if (!Array.isArray(value)) {
            return `'${fieldName}' must be an array`;
        }
        if (value.length < 1) {
            return `'${fieldName}' can't not empty`;
        }
        if (!value.every((item) => typeof item === 'number' && item > 0)) {
            return `'${fieldName}' must be an array of positive numbers`;
        }
        const uniqueIds = [...new Set(value)];
        if (uniqueIds.length !== value.length) {
            return `'${fieldName}' must contain unique values`;
        }
        return undefined;
    }
    private static isValidTimeZone(timeZone: string): boolean {
        try {
            return Intl.supportedValuesOf("timeZone").includes(timeZone);
        } catch (e) {
            try {
                new Intl.DateTimeFormat("en-US", { timeZone });
                return true;
            } catch {
                return false;
            }
        }
    }
    private static validateUploadedFile(fieldName: string, file: UploadedFile): string | undefined {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxFileSize = 3 * 1024 * 1024; // 3MB

        if (!file) {
            return `'${fieldName}' is required`;
        }
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return `'${fieldName}' must be a valid image (jpeg, png, webp)`;
        }
        if (file.size > maxFileSize) {
            return `'${fieldName}' must be smaller than 2MB`;
        }
        return undefined;
    }
    private static validateImageArray(fieldName: string, images: { name: string; file: UploadedFile }[]): string | undefined {
        if (!Array.isArray(images)) {
            return `'${fieldName}' must be an array`;
        }

        for (const [index, image] of images.entries()) {
            if (!image.name || typeof image.name !== "string") {
                return `'${fieldName}[${index}].name' must be a non-empty string`;
            }

            const fileError = this.validateUploadedFile(`${fieldName}[${index}].file`, image.file);
            if (fileError) return fileError;
        }

        return undefined;
    }
}