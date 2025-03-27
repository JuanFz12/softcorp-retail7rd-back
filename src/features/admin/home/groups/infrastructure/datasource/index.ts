import { prisma } from "../../../../../../config";
import { CustomError, ServerResponseEntity } from "../../../../shared";
import { GroupsManagementDataSource, CreateGroupDto, FindGroupsDto, UpdateGroupDto, Group } from "../../domain";

export class GroupsManagementDataSourceImpl implements GroupsManagementDataSource<FindGroupsDto, number, CreateGroupDto, UpdateGroupDto, number> {
    async find({ attributesDto }: FindGroupsDto): Promise<ServerResponseEntity> {
        try {
            const { pagination } = attributesDto
            const groups = await prisma.group.findMany({
                include: { lineConfiguration: true },
                take: pagination.limit,
                skip: (pagination.page - 1) * pagination.limit,
            });
            const totalGroupsCount = await prisma.group.count();
            const totalPages = Math.ceil(totalGroupsCount / pagination.limit);
            const groupsToEntity = groups.map(({ id, name, lineConfiguration }) => Group.fromObject({ id, name, linesConfiguration: lineConfiguration.length }).attributesDto)
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    groups: groupsToEntity,
                    pagination: {
                        page: pagination.page,
                        limit: pagination.limit,
                        totalPages
                    }
                },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async findOne(dto: number): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async create({ attributesDto }: CreateGroupDto): Promise<ServerResponseEntity> {
        try {
            const { linesConfigurationIds, name } = attributesDto;
            await Promise.all(
                linesConfigurationIds.map((id) => this.findOneLineConfigurationById(id))
            );
            const newGroup = await prisma.group.create({ data: { name, lineConfiguration: { connect: linesConfigurationIds.map(id => ({ id })) } } })
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    group: Group.fromObject({
                        id: newGroup.id,
                        name: newGroup.name,
                        linesConfiguration: linesConfigurationIds.length
                    }).attributesDto
                },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async update(dto: UpdateGroupDto): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async delete(dto: number): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: undefined,
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async findOneGroupById(id: number) {
        try {
            const group = await prisma.group.findUnique({ where: { id } });
            if (!group) throw CustomError.notFound('Group not found');
            return group;
        } catch (error) {
            throw error
        }
    }
    async findOneLineConfigurationById(id: number) {
        try {
            const lineConfiguration = await prisma.lineConfiguration.findUnique({ where: { id } });
            if (!lineConfiguration) throw CustomError.notFound('Line Configuration not found');
            return lineConfiguration;
        } catch (error) {
            throw error
        }
    }
}