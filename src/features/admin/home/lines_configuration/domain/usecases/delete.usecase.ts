import { ServerResponseEntity } from "../../../../shared";
import { CreateLineConfigurationDto, DeleteLineConfigurationDto, FindLinesConfigurationDto, UpdateLineConfigurationDto } from "../dtos";
import { LinesConfigurationRepository } from "../repository";

interface LinesConfiguration {
    execute(data: DeleteLineConfigurationDto): Promise<ServerResponseEntity>;
}

export class DeleteLineConfigurationUseCase implements LinesConfiguration {
    constructor(
        private readonly repository: LinesConfigurationRepository<FindLinesConfigurationDto, number, CreateLineConfigurationDto, UpdateLineConfigurationDto, DeleteLineConfigurationDto>
    ) { }
    execute(data: DeleteLineConfigurationDto): Promise<ServerResponseEntity> {
        return this.repository.delete(data);
    }
}


