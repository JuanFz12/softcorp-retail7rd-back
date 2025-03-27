import { ServerResponseEntity } from "../../../../shared";
import { CreateUserDto, FindUsersDto, UpdateUserDto } from "../dtos";
import { UserManagementRepository } from "../repository";

interface UserManagement {
    execute(dto: FindUsersDto): Promise<ServerResponseEntity>;
}
export class FindUsersUseCase implements UserManagement {
    constructor(
        private readonly repository: UserManagementRepository<FindUsersDto, number, CreateUserDto, UpdateUserDto, number>
    ) { }
    execute(dto: FindUsersDto): Promise<ServerResponseEntity> {
        return this.repository.find(dto);
    }
}