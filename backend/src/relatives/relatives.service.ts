import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelativesService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.relative.findMany({
            include: { memories: true, comments: true },
        });
    }

    findOne(id: string) {
        return this.prisma.relative.findUnique({
            where: { id },
            include: { memories: true, comments: true },
        });
    }
}
