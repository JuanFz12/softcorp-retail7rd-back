import { CommonMethodsAuth, ServerResponseEntity } from "../../../shared";

export abstract class AuthRepository<TLogin, TRegister, TRecover> implements CommonMethodsAuth<TLogin, TRegister, TRecover> {
    abstract login(dto: TLogin): Promise<ServerResponseEntity>;
    abstract register(dto: TRegister): Promise<ServerResponseEntity>;
    abstract recoverPassword(dto: TRecover): Promise<ServerResponseEntity>;
    abstract checkAuthStatus(id: number): Promise<ServerResponseEntity>;
}