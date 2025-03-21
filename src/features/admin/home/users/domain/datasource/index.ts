import { CommonMethodsCrud, ServerResponseEntity } from "../../../../shared";

export abstract class UserManagementDataSource<TGetAll, TById, TCreate, TUpdate, TDelete> implements CommonMethodsCrud<TGetAll, TById, TCreate, TUpdate, TDelete> {
    abstract find(dto: TGetAll): Promise<ServerResponseEntity>;
    abstract findOne(dto: TById): Promise<ServerResponseEntity>;
    abstract create(data: TCreate): Promise<ServerResponseEntity>;
    abstract update(dto: TUpdate): Promise<ServerResponseEntity>;
    abstract delete(dto: TDelete): Promise<ServerResponseEntity>;
}