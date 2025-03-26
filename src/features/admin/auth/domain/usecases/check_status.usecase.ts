import { ServerResponseEntity } from "../../../shared";
import { LoginDto } from "../dto";
import { AuthRepository } from "../repository";

interface Auth {
    execute(id: number): Promise<ServerResponseEntity>;
}

export class CheckStatusUseCase implements Auth {
    constructor(
        private readonly repository: AuthRepository<LoginDto, string, string>
    ) { }
    execute(id: number): Promise<ServerResponseEntity> {
        return this.repository.checkAuthStatus(id);
    }
}