import { ServerResponseEntity } from "../../domain";

export interface CommonMethodsAuth<TLogin, TRegister, TRecover> {
    login(dto: TLogin): Promise<ServerResponseEntity>;
    register(dto: TRegister): Promise<ServerResponseEntity>;
    recoverPassword(dto: TRecover): Promise<ServerResponseEntity>;
    checkAuthStatus(id: number): Promise<ServerResponseEntity>;
}