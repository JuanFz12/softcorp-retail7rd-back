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
    /* showAdvertisingEvery: string;
    advertisingImage: UploadedFile;
    images: { name: string; file: UploadedFile }[]; */
    headersImages: { file: UploadedFile; tournamentId: number }[];
    advertisingImages: { file: UploadedFile; seconds: string }[];
}
export class CreateLineConfigurationDto {
    private constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static create(obj: { [key: string]: any }): [string[] | string | undefined, CreateLineConfigurationDto?] {
        const errorsProperties: string[] = [];
        const { name, lineType, themeId, viewType, alternativeEquipmentCode, advertisingImages, headersImages, timeZone, userId, tournamentIds, sportIds, championshipIds } = obj;
        if (!name) errorsProperties.push("Missing 'name' property");
        if (!timeZone) errorsProperties.push("Missing 'timeZone' property");
        if (!lineType) errorsProperties.push("Missing 'lineType' property");
        /* if (!showAdvertisingEvery) errorsProperties.push("Missing 'showAdvertisingEvery' property"); */
        if (themeId === undefined) errorsProperties.push("Missing 'themeId' property");
        if (userId === undefined) errorsProperties.push("Missing 'userId' property");
        if (advertisingImages === undefined) errorsProperties.push("Missing 'advertisingImages' property");
        if (headersImages === undefined) errorsProperties.push("Missing 'headersImages' property");
        if (tournamentIds === undefined) errorsProperties.push("Missing 'tournamentIds' property");
        if (sportIds === undefined) errorsProperties.push("Missing 'sportIds' property");
        if (championshipIds === undefined) errorsProperties.push("Missing 'championshipIds' property");
        if (alternativeEquipmentCode === undefined) errorsProperties.push("Missing 'alternativeEquipmentCode' property");
        if (!viewType) errorsProperties.push("Missing 'viewType' property");
        if (errorsProperties.length > 0) {
            return [errorsProperties];
        }
        const errorsPropertiesTypes: string[] = [];

        if (typeof name !== 'string') errorsPropertiesTypes.push("'name' must be string")
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
        const arrayFields = ["tournamentIds", "sportIds", "championshipIds"];

        for (const field of arrayFields) {
            const error = this.validateNumberArray(field, obj[field]);
            if (error) errorsPropertiesTypes.push(error);
        }
     

        const headersImagesError = this.validateImageArray2("headersImages", obj.headersImages);
        const advertisingImagesError = this.validateAdvertisingImagesArray("advertisingImages", obj.advertisingImages);
        if (headersImagesError) errorsPropertiesTypes.push(headersImagesError);
        if (advertisingImagesError) errorsPropertiesTypes.push(advertisingImagesError);
        if (errorsPropertiesTypes.length > 0) {
            return [errorsPropertiesTypes];
        }
        const attributes: Attributes = {
            name: name.trim(),
            lineType,
            themeId: +themeId,
            userId: +userId,
            /*    advertisingImage, */
            viewType,
            timeZone: timeZone.trim(),
            alternativeEquipmentCode,
            tournamentIds,
            sportIds,
            championshipIds,
            /* images, */
            headersImages,
            advertisingImages,
            /*   showAdvertisingEvery: showAdvertisingEvery.trim() */
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

    private static validateImageArray2(fieldName: string, images: { tournamentId: number; file: UploadedFile }[]): string | undefined {
        if (!Array.isArray(images)) {
            return `'${fieldName}' must be an array`;
        }

        for (const [index, image] of images.entries()) {
            if (!image.tournamentId || typeof image.tournamentId !== "number") {
                return `'${fieldName}[${index}].tournamentId' must be number`;
            }

            const fileError = this.validateUploadedFile(`${fieldName}[${index}].file`, image.file);
            if (fileError) return fileError;
        }

        return undefined;
    }
    private static validateAdvertisingImagesArray(fieldName: string, images: { seconds: string; file: UploadedFile }[]): string | undefined {
        if (!Array.isArray(images)) {
            return `'${fieldName}' must be an array`;
        }

        for (const [index, image] of images.entries()) {
            if (!image.seconds || typeof image.seconds !== "string") {
                return `'${fieldName}[${index}].seconds' must be a non-empty string`;
            }

            const fileError = this.validateUploadedFile(`${fieldName}[${index}].file`, image.file);
            if (fileError) return fileError;
        }

        return undefined;
    }
}