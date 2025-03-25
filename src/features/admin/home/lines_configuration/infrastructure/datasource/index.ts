import { prisma } from "../../../../../../config";
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
            const { advertisingImage, images, ...restDto } = attributesDto;
            const { alternativeEquipmentCode, name, lineType, timeZone, viewType, themeId, userId, showAdvertisingEvery } = attributesDto;
            await prisma.$transaction(async (prismaCLI) => {
                const newLineConfiguration = await prismaCLI.lineConfiguration.create({ data: { alternativeEquipmentCode, name, timeZone, type: lineType, viewType, themeId, userId } })
                await prisma.lineConfigurationAdvertising.create({ data: { lineConfigurationId: newLineConfiguration.id, showEvery: showAdvertisingEvery, path: '' } })
                const data = [
                    {
                        path: '', name: '', lineConfigurationId: newLineConfiguration.id
                    }
                ];
                await prisma.lineConfigurationImage.createMany({ data })
            })
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: { ...restDto, advertisingImage: advertisingImage.name, images: images.map(image => image.name) },
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