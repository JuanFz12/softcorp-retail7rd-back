import { CustomError } from "../../../../shared";
export interface SportAttributes {
    id: number;
    name: string;
}
export class Sport {
    constructor(
        private readonly attributes: SportAttributes
    ) { }
    get sportAttributes(): SportAttributes {
        return this.attributes;
    }
    static fromObject(object: Record<string, any>): Sport {
        const id = this.validateProperty<number>(object, 'id', 'number');
        const name = this.validateProperty<string>(object, 'name', 'string');
        const attributes: SportAttributes = {
            id: +id,
            name: name.trim()
        }
        return new Sport(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in Sport`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (Sport )`);
        }
        return object[propertyName];
    }
}