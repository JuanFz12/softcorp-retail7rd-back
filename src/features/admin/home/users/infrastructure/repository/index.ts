import { ServerResponseEntity } from "../../../../shared";
import { CreateUserDto, FindUsersDto, UpdateUserDto, UserManagementDataSource, UserManagementRepository } from "../../domain";

export class UserManagementRepositoryImpl implements UserManagementRepository<FindUsersDto, number, CreateUserDto, UpdateUserDto, number> {
    constructor(
        private readonly datasource: UserManagementDataSource<FindUsersDto, number, CreateUserDto, UpdateUserDto, number>
    ) { }
    find(dto: FindUsersDto): Promise<ServerResponseEntity> {
        return this.datasource.find(dto);
    }
    findOne(dto: number): Promise<ServerResponseEntity> {
        return this.datasource.findOne(dto);
    }
    create(data: CreateUserDto): Promise<ServerResponseEntity> {
        return this.datasource.create(data);
    }
    update(dto: UpdateUserDto): Promise<ServerResponseEntity> {
        return this.datasource.update(dto);
    }
    delete(dto: number): Promise<ServerResponseEntity> {
        return this.datasource.delete(dto);
    }
}