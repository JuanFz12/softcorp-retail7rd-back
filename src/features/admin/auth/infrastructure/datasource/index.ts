import { BcryptPlugin, envs, JwtPlugin, prisma } from "../../../../../config";
import { CustomError, ServerResponseEntity, User } from "../../../shared";
import { AuthDataSource, LoginDto } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource<LoginDto, string, string> {
    async login({ email, password }: LoginDto): Promise<ServerResponseEntity> {
        try {
            const user = await this.findUserByEmail(email);
            if (!BcryptPlugin.compare(password, user.password)) throw CustomError.unauthorized('Error when logging in email or incorrect passwords');
            const token = await JwtPlugin.generateToken({ payload: { id: user.id }, seed: envs.JWT_SEED });
            const dataToEntity = User.fromObject({
                name: user.name,
                id: user.id,
                email: user.email,
                role: user.role,
                screens: user.screens
            }).userAttributes;
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: { user: dataToEntity, token },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    register(dto: string): Promise<ServerResponseEntity> {
        throw new Error("Method not implemented.");
    }
    recoverPassword(dto: string): Promise<ServerResponseEntity> {
        throw new Error("Method not implemented.");
    }
    async checkAuthStatus(id: number): Promise<ServerResponseEntity> {
        try {
            const user = await this.findUserById(id);
            const token = await JwtPlugin.generateToken({ payload: { id: user.id }, seed: envs.JWT_SEED });
            const dataToEntity = User.fromObject({
                name: user.name,
                id: user.id,
                email: user.email,
                role: user.role,
                screens: user.screens
            }).userAttributes;
            return ServerResponseEntity.fromObject({
                status: "success",
                message: "",
                data: { user: dataToEntity, token },
                error: null
            })
        } catch (error) {
            throw error;
        }
    }
    private async findUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) throw CustomError.unauthorized('Password or Email incorrect');
            return user;
        } catch (error) {
            throw error;
        }
    }
    private async findUserById(id: number) {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) throw CustomError.unauthorized('Session ended')
            return user;
        } catch (error) {
            throw error;
        }
    }
}