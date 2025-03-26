import { ServerResponseEntity } from "../../../shared";
import { AuthDataSource, AuthRepository, LoginDto } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository<LoginDto, string, string> {
    constructor(
        private readonly datasource: AuthDataSource<LoginDto, string, string>
    ) { }
    login(dto: LoginDto): Promise<ServerResponseEntity> {
        return this.datasource.login(dto);
    }
    register(dto: string): Promise<ServerResponseEntity> {
        return this.datasource.register(dto);
    }
    recoverPassword(dto: string): Promise<ServerResponseEntity> {
        return this.datasource.recoverPassword(dto);
    }
    checkAuthStatus(id: number): Promise<ServerResponseEntity> {
        return this.datasource.checkAuthStatus(id);
    }
}