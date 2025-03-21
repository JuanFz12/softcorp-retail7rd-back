import { ServerResponseEntity } from "../../domain";

export interface CommonMethodsCrud<TGetAll, TById, TCreate, TUpdate, TDelete> {
    find(dto: TGetAll): Promise<ServerResponseEntity>;
    findOne(dto: TById): Promise<ServerResponseEntity>;
    create(data: TCreate): Promise<ServerResponseEntity>;
    update(dto: TUpdate): Promise<ServerResponseEntity>;
    delete(dto: TDelete): Promise<ServerResponseEntity>;
}