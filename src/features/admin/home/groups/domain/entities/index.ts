import { CustomError } from "../../../../shared";
interface Attributes {
    id: number;
    name: string;
    linesConfiguration: number;
}
export class Group {
    constructor(
        private readonly attributes: Attributes
    ) { }
    get attributesDto(): Attributes {
        return this.attributes;
    }
    static fromObject(object: Record<string, any>): Group {
        const name = this.validateProperty<string>(object, 'name', "string")
        const linesConfiguration = this.validateProperty<number>(object, 'linesConfiguration', "number")
        const id = this.validateProperty<number>(object, 'id', "number")
        const attributes: Attributes = {
            id,
            name,
            linesConfiguration
        }
        return new Group(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in Group`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (Group )`);
        }
        return object[propertyName];
    }
}