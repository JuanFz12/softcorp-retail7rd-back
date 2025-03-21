import { BcryptPlugin, prisma } from "../../../../../../config";
import { ServerResponseEntity } from "../../../../shared";
import { CreateUserDto, FindUsersDto, UpdateUserDto, UserManagementDataSource } from "../../domain";

export class UserManagementDataSourceImpl implements UserManagementDataSource<FindUsersDto, number, CreateUserDto, UpdateUserDto, number> {
    async find(dto: FindUsersDto): Promise<ServerResponseEntity> {
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
            const { email, language, name, password, role } = attributesDto
            await prisma.$transaction(async (prismaCLI) => {
                await prismaCLI.user.create({
                    data: { email, language, name, password: BcryptPlugin.hash(password), role }
                })
            });
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: { ...attributesDto },
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