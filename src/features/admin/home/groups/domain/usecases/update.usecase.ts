import { ServerResponseEntity } from "../../../../shared";
import { CreateGroupDto, FindGroupsDto, UpdateGroupDto } from "../dtos";
import { GroupsManagementRepository } from "../repository";

interface GroupManagement {
    execute(dto: UpdateGroupDto): Promise<ServerResponseEntity>;
}
export class UpdateGroupUseCase implements GroupManagement {
    constructor(
        private readonly repository: GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    execute(dto: UpdateGroupDto): Promise<ServerResponseEntity> {
        return this.repository.update(dto);
    }
}