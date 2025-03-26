import { LineConfigurationViewType } from "@prisma/client";
import { CustomError, Named } from "../../../../shared";
interface LineConfigurationAttributes {
    id: number;
    name: string;
    timeZone: string;
    viewType: LineConfigurationViewType;
    createdBy: Named;
    createdAt: Date;
    isActive: boolean;
}
export class LineConfiguration {
    constructor(
        private readonly attributes: LineConfigurationAttributes
    ) { }
    get lineConfigurationAttributes(): LineConfigurationAttributes {
        return this.attributes;
    }
    static fromObject(object: Record<string, any>): LineConfiguration {
        const { viewType, createdAt } = object;
        const id = this.validateProperty<number>(object, 'id', 'number');
        const name = this.validateProperty<string>(object, 'name', 'string');
        const timeZone = this.validateProperty<string>(object, 'timeZone', 'string');
        const isActive = this.validateProperty<boolean>(object, 'isActive', 'boolean');
        if (!this.validateEnum(viewType, LineConfigurationViewType)) {
            throw CustomError.internalServer(`'viewType' must be a valid value: ${Object.values(LineConfigurationViewType).join(', ')}`);
        }
        if (!this.validateDate(createdAt)) throw CustomError.internalServer(`Invalid date format, it must be an Date.`)
        const createdBy = this.validateNamed(object.createdBy, 'createdBy');

        const attributes: LineConfigurationAttributes = {
            id: +id,
            name: name.trim(),
            timeZone: timeZone.trim(),
            viewType,
            createdBy,
            createdAt: new Date(),
            isActive
        }
        return new LineConfiguration(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in ineConfiguration`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (ineConfiguration )`);
        }
        return object[propertyName];
    }
    private static validateEnum<T extends Record<string, string | number>>(value: any, enumObject: T): boolean {
        return Object.values(enumObject).includes(value);
    }
    private static validateDate(date: string): boolean {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }
    private static validateNamed(named: any, propertyName: string): Named {
        if (!named || typeof named !== 'object') {
            throw CustomError.internalServer(`The '${propertyName}' must be an object with 'id' and 'name'.`);
        }
        const id = this.validateProperty<number>(named, 'id', 'number');
        const name = this.validateProperty<string>(named, 'name', 'string');
        return { id, name };
    }
}