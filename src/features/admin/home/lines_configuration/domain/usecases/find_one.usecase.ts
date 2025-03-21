import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto } from "../dtos";
import { LinesConfigurationRepository } from "../repository";

interface LinesConfiguration {
    execute(data: number): Promise<ServerResponseEntity>;
}

export class FindLineConfigurationUseCase implements LinesConfiguration {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    execute(data: number): Promise<ServerResponseEntity> {
        return this.repository.findOne(data);
    }
}


