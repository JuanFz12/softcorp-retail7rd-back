import { ServerResponseEntity } from "../../../../shared";
import { CreateGroupDto, FindGroupsDto, UpdateGroupDto } from "../dtos";
import { GroupsManagementRepository } from "../repository";

interface GroupManagement {
    execute(dto: number): Promise<ServerResponseEntity>;
}
export class DeleteGroupUseCase implements GroupManagement {
    constructor(
        private readonly repository: GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    execute(dto: number): Promise<ServerResponseEntity> {
        return this.repository.delete(dto);
    }
}