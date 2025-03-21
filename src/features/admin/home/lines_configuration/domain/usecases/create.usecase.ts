import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto } from "../dtos";
import { LinesConfigurationRepository } from "../repository";

interface LinesConfiguration {
    execute(data: CreateLineConfigurationDto): Promise<ServerResponseEntity>;
}

export class CreateLineConfigurationUseCase implements LinesConfiguration {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    execute(data: CreateLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.repository.create(data);
    }
}


