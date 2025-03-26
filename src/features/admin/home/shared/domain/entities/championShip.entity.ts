import { CustomError } from "../../../../shared";
export interface ChampionShipAttributes {
    id: number;
    name: string;
}
export class ChampionShip {
    constructor(
        private readonly attributes: ChampionShipAttributes
    ) { }
    get championShipAttributes(): ChampionShipAttributes {
        return this.attributes;
    }
    static fromObject(object: Record<string, any>): ChampionShip {
        const id = this.validateProperty<number>(object, 'id', 'number');
        const name = this.validateProperty<string>(object, 'name', 'string');
        const attributes: ChampionShipAttributes = {
            id: +id,
            name: name.trim()
        }
        return new ChampionShip(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in ChampionShip`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (ChampionShip )`);
        }
        return object[propertyName];
    }
}