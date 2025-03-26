import { CustomError } from "../../../../shared";

export interface TournamentAttributes {
    id: number;
    name: string;
}
export class Tournament {
    constructor(
        private readonly attributes: TournamentAttributes
    ) { }
    get tournamentAttributes(): TournamentAttributes {
        return this.attributes;
    }
    static fromObject(object: Record<string, any>): Tournament {
        const id = this.validateProperty<number>(object, 'id', 'number');
        const name = this.validateProperty<string>(object, 'name', 'string');
        const attributes: TournamentAttributes = {
            id: +id,
            name: name.trim()
        }
        return new Tournament(attributes);
    }
    private static validateProperty<T>(object: { [key: string]: any }, propertyName: string, type: string): T {
        if (object[propertyName] === undefined) {
            throw CustomError.internalServer(`The '${propertyName}' argument is missing in Tournament`);
        }
        if (typeof object[propertyName] !== type) {
            throw CustomError.internalServer(`The '${propertyName}' must be a ${type}, but received ${typeof object[propertyName]} (Tournament )`);
        }
        return object[propertyName];
    }
}