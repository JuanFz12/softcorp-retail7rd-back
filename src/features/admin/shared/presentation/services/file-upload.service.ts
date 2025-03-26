import { UploadedFile } from "express-fileupload"
import { CustomError } from "../../domain"
import fs from 'node:fs'
import path from 'node:path'
import { UuidPlugin } from "../../../../../config"
export interface FileUploadServiceInterface {
    uploadSingle(file: UploadedFile, folder?: string, validExtensions?: string[]): Promise<{ fileName: string }>;
    uploadMultiple(files: UploadedFile[], folder?: string, validExtensions?: string[]): Promise<{ fileName: string }[]>;
    deleteFile(fileName: string, folder: string): Promise<void>;
}
export class FileUploadService implements FileUploadServiceInterface {
    constructor(private readonly uuid = UuidPlugin.v4) { }
    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
        }
    }

    public async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    ) {
        try {
            const fileExtension = file?.mimetype.split('/').at(1) ?? ''
            if (fileExtension && !validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(
                    `Invalid extension: ${fileExtension},valid ones ${validExtensions}`
                )
            }
            const destination = path.resolve(__dirname, '../../../../', folder)
            this.checkFolder(destination)
            const fileName = `${this.uuid()}.${fileExtension}`
            void file?.mv(`${destination}/${fileName}`)
            return { fileName }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = [
            'png',
            'jpg',
            'jpeg',
            'gif',
            'pdf',
            'webp',
            'avif'
        ]
    ) {
        const filesNames = await Promise.all(
            files.map(
                async file => await this.uploadSingle(file, folder, validExtensions)
            )
        )
        return filesNames
    }
    public async deleteFile(fileName: string, folder: string = 'uploads'): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, '../../../../', folder, fileName);

            if (!fs.existsSync(filePath)) {
                return;
            }

            await fs.promises.unlink(filePath);
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}