import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, LinesConfigurationDataSource, LinesConfigurationRepository, UpdateLineConfigurationDto } from "../../domain";

export class LinesConfigurationRepositoryImpl implements LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto> {
    constructor(
        private readonly datasource: LinesConfigurationDataSource<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    find(dto: FindLinesConfigurationDto): Promise<ServerResponseEntity> {
        return this.datasource.find(dto);
    }
    findOne(dto: number): Promise<ServerResponseEntity> {
        return this.datasource.findOne(dto);
    }
    create(data: CreateLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.datasource.create(data);
    }
    update(dto: UpdateLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.datasource.update(dto);
    }
    delete(dto: DeleteLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.datasource.delete(dto);
    }
}

