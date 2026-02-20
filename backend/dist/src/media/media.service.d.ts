import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class MediaService {
    constructor();
    uploadImage(fileBuffer: Buffer): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
