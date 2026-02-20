import { PrismaService } from '../prisma/prisma.service';
export declare class ContributionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment(relativeId: string, author: string, text: string): Promise<{
        id: string;
        author: string;
        text: string;
        createdAt: Date;
        relativeId: string;
    }>;
    createMemory(relativeId: string, type: string, url: string): Promise<{
        id: string;
        type: string;
        url: string;
        relativeId: string;
        createdAt: Date;
    }>;
}
