import { BcryptPlugin, prisma } from "../../../../../../config";
import { CustomError, ServerResponseEntity, User, UserAttributes } from "../../../../shared";
import { CreateUserDto, FindUsersDto, UpdateUserDto, UserManagement, UserManagementDataSource } from "../../domain";

export class UserManagementDataSourceImpl implements UserManagementDataSource<FindUsersDto, number, CreateUserDto, UpdateUserDto, number> {
    async find({ attributesDto }: FindUsersDto): Promise<ServerResponseEntity> {
        try {
            const { pagination } = attributesDto
            const users = await prisma.user.findMany({
                take: pagination.limit,
                skip: (pagination.page - 1) * pagination.limit,
                include: { group: { include: { lineConfiguration: true } } }
            });
            const totalUsersCount = await prisma.user.count();
            const totalPages = Math.ceil(totalUsersCount / pagination.limit);
            const dataToEntity = users.map(user => {
                const totalLineConfigurations = user.group.reduce((acc, group) => acc + group.lineConfiguration.length, 0);
                return UserManagement.fromObject({
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    language: user.language,
                    groups: user.group.map(({ id, name }) => ({ id, name })),
                    configurations: totalLineConfigurations,
                    isActive: user.isActive,
                }).userManagementAttributes;
            });
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    users: dataToEntity,
                    pagination: {
                        limit: pagination.limit,
                        page: pagination.page,
                        totalPages: totalPages
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
    async create({ attributesDto }: CreateUserDto): Promise<ServerResponseEntity> {
        try {
            const { email, language, name, password, role, groupIds, screens } = attributesDto
            const hasUser = await prisma.user.findUnique({ where: { email } });
            if (hasUser) throw CustomError.Conflict(`User with email ${email} already exist`);
            const groups = await prisma.group.findMany({ where: { id: { in: groupIds } } });
            const foundIds = groups.map(sport => sport.id);
            const missingIds = groupIds.filter(id => !foundIds.includes(id));
            if (missingIds.length > 0) {
                throw CustomError.notFound(`Group(s) with ID(s) ${missingIds.join(', ')} not found`);
            }
            const { newUser, totalLineConfigurations } = await prisma.$transaction(async (prismaCLI) => {
                const newUser = await prismaCLI.user.create({
                    data: { email, language, name, password: BcryptPlugin.hash(password), role, screens, group: { connect: groupIds.map(group => ({ id: group })) } },
                    include: { group: { include: { lineConfiguration: true } }, }
                })
                const totalLineConfigurations = newUser.group.reduce((acc, group) => acc + group.lineConfiguration.length, 0);

                return { newUser, totalLineConfigurations };
            });
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {
                    user: UserManagement.fromObject({
                        id: newUser.id,
                        name: newUser.name,
                        role: newUser.role,
                        language: newUser.language,
                        groups: newUser.group.map(({ id, name }) => ({ id, name })),
                        configurations: totalLineConfigurations,
                        isActive: newUser.isActive,
                    }).userManagementAttributes
                },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async update(dto: UpdateUserDto): Promise<ServerResponseEntity> {
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
}