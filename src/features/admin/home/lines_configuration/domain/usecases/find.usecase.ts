import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto } from "../dtos";
import { LinesConfigurationRepository } from "../repository";

interface LinesConfiguration {
    execute(data: FindLinesConfigurationDto): Promise<ServerResponseEntity>;
}

export class FindLinesConfigurationUseCase implements LinesConfiguration {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    execute(data: FindLinesConfigurationDto): Promise<ServerResponseEntity> {
        return this.repository.find(data);
    }
}


