import { ServerResponseEntity } from "../../../../shared";
import { CreateUserDto, FindUsersDto, UpdateUserDto } from "../dtos";
import { UserManagementRepository } from "../repository";

interface UserManagement {
    execute(data: CreateUserDto): Promise<ServerResponseEntity>;
}
export class CreateUserUseCase implements UserManagement {
    constructor(
        private readonly repository: UserManagementRepository<FindUsersDto, number, CreateUserDto, UpdateUserDto, number>
    ) { }
    execute(data: CreateUserDto): Promise<ServerResponseEntity> {
        return this.repository.create(data);
    }
}