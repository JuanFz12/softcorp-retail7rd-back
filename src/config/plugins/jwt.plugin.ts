/* eslint-disable */
import jwt from 'jsonwebtoken'
import { envs } from './envs';

interface GenerateTokenProps {
    payload: any, duration?: number, seed: string
}
export class JwtPlugin {
    static async generateToken({
        payload,
        duration = 24,
        seed
    }: GenerateTokenProps) {
        const expiresInSeconds = duration * 3600;
        return await new Promise(resolve => {
            jwt.sign(payload, seed, { expiresIn: expiresInSeconds }, (error, token) => {
                if (error) {
                    resolve(null)
                    return
                }
                resolve(token)
            })
        })
    }

    static async validatedToken<T>(token: string): Promise<T | null> {
        return await new Promise(resolve => {
            jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
                if (err) {
                    resolve(null)
                    return
                }
                resolve(decoded as T)
            })
        })
    }
}
