import { RelativesService } from './relatives.service';
export declare class RelativesController {
    private readonly relativesService;
    constructor(relativesService: RelativesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        memories: {
            id: string;
            type: string;
            url: string;
            relativeId: string;
            createdAt: Date;
        }[];
        comments: {
            id: string;
            author: string;
            text: string;
            createdAt: Date;
            relativeId: string;
        }[];
    } & {
        id: string;
        name: string;
        birthDate: Date | null;
        deathDate: Date | null;
        biography: string | null;
        mainImageUrl: string;
        level: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RelativeClient<({
        memories: {
            id: string;
            type: string;
            url: string;
            relativeId: string;
            createdAt: Date;
        }[];
        comments: {
            id: string;
            author: string;
            text: string;
            createdAt: Date;
            relativeId: string;
        }[];
    } & {
        id: string;
        name: string;
        birthDate: Date | null;
        deathDate: Date | null;
        biography: string | null;
        mainImageUrl: string;
        level: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
