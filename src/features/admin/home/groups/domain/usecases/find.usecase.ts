import { ServerResponseEntity } from "../../../../shared";
import { CreateGroupDto, FindGroupsDto, UpdateGroupDto } from "../dtos";
import { GroupsManagementRepository } from "../repository";

interface GroupManagement {
    execute(dto: FindGroupsDto): Promise<ServerResponseEntity>;
}
export class FindGroupsUseCase implements GroupManagement {
    constructor(
        private readonly repository: GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    execute(dto: FindGroupsDto): Promise<ServerResponseEntity> {
        return this.repository.find(dto);
    }
}