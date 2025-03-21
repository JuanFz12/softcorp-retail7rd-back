import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto } from "../dtos";
import { LinesConfigurationRepository } from "../repository";

interface LinesConfiguration {
    execute(data: UpdateLineConfigurationDto): Promise<ServerResponseEntity>;
}

export class UpdateLineConfigurationUseCase implements LinesConfiguration {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    execute(data: UpdateLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.repository.update(data);
    }
}


