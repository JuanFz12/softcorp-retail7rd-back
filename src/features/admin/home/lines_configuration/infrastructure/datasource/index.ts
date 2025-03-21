import { ServerResponseEntity } from "../../../../shared";
import { LinesConfigurationDataSource, CreateLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto } from "../../domain";

export class LinesConfigurationDataSourceImpl implements LinesConfigurationDataSource<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto> {
    async find(dto: FindLinesConfigurationDto): Promise<ServerResponseEntity> {
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
    async create({ attributesDto }: CreateLineConfigurationDto): Promise<ServerResponseEntity> {
        try {
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: {...attributesDto},
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    async update(dto: UpdateLineConfigurationDto): Promise<ServerResponseEntity> {
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
    async delete(dto: DeleteLineConfigurationDto): Promise<ServerResponseEntity> {
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