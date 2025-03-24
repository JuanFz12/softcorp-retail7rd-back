import { ServerResponseEntity } from "../../../../shared";
import { CreateGroupDto, FindGroupsDto, UpdateGroupDto } from "../dtos";
import { GroupsManagementRepository } from "../repository";

interface GroupManagement {
    execute(dto: CreateGroupDto): Promise<ServerResponseEntity>;
}
export class CreateGroupUseCase implements GroupManagement {
    constructor(
        private readonly repository: GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    execute(dto: CreateGroupDto): Promise<ServerResponseEntity> {
        return this.repository.create(dto);
    }
}