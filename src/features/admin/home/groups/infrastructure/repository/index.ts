import { ServerResponseEntity } from "../../../../shared";
import { GroupsManagementDataSource, GroupsManagementRepository, CreateGroupDto, FindGroupsDto, UpdateGroupDto } from "../../domain";

export class GroupsManagementRepositoryImpl implements GroupsManagementRepository<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number> {
    constructor(
        private readonly datasource: GroupsManagementDataSource<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number>
    ) { }
    find(dto: FindGroupsDto): Promise<ServerResponseEntity> {
        return this.datasource.find(dto);
    }
    findOne(dto: number): Promise<ServerResponseEntity> {
        return this.datasource.findOne(dto);
    }
    create(data: CreateGroupDto): Promise<ServerResponseEntity> {
        return this.datasource.create(data);
    }
    update(dto: UpdateGroupDto): Promise<ServerResponseEntity> {
        return this.datasource.update(dto);
    }
    delete(dto: number): Promise<ServerResponseEntity> {
        return this.datasource.delete(dto);
    }

}