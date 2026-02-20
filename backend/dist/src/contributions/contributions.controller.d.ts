import { ContributionsService } from './contributions.service';
import { MediaService } from '../media/media.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateMemoryDto } from './dto/create-memory.dto';
export declare class ContributionsController {
    private readonly contributionsService;
    private readonly mediaService;
    constructor(contributionsService: ContributionsService, mediaService: MediaService);
    addComment(createCommentDto: CreateCommentDto): Promise<{
        id: string;
        author: string;
        text: string;
        createdAt: Date;
        relativeId: string;
    }>;
    uploadMemory(file: Express.Multer.File, relativeId: string): Promise<{
        id: string;
        type: string;
        url: string;
        relativeId: string;
        createdAt: Date;
    }>;
    addMemory(createMemoryDto: CreateMemoryDto): Promise<{
        id: string;
        type: string;
        url: string;
        relativeId: string;
        createdAt: Date;
    }>;
}
