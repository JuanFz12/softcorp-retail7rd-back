import { ServerResponseEntity } from "../../../shared";
import { LoginDto } from "../dto";
import { AuthRepository } from "../repository";

interface Auth {
    execute(dto: LoginDto): Promise<ServerResponseEntity>;
}

export class LoginUseCase implements Auth {
    constructor(
        private readonly repository: AuthRepository<LoginDto, string, string>
    ) { }
    execute(dto: LoginDto): Promise<ServerResponseEntity> {
        return this.repository.login(dto);
    }

}