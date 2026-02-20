import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContributionsService {
    constructor(private prisma: PrismaService) { }

    async createComment(relativeId: string, author: string, text: string) {
        return this.prisma.comment.create({
            data: {
                relativeId,
                author,
                text,
            },
        });
    }

    async createMemory(relativeId: string, type: string, url: string) {
        return this.prisma.memory.create({
            data: {
                relativeId,
                type,
                url,
            },
        });
    }
}
