import { Controller, Post, Body, ValidationPipe, UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContributionsService } from './contributions.service';
import { MediaService } from '../media/media.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateMemoryDto } from './dto/create-memory.dto';

@Controller('contributions')
export class ContributionsController {
    constructor(
        private readonly contributionsService: ContributionsService,
        private readonly mediaService: MediaService,
    ) { }

    @Post('comment')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async addComment(@Body() createCommentDto: CreateCommentDto) {
        const { relativeId, author, text } = createCommentDto;
        return this.contributionsService.createComment(relativeId, author, text);
    }

    @Post('upload-memory')
    @UseInterceptors(FileInterceptor('file'))
    async uploadMemory(
        @UploadedFile() file: Express.Multer.File,
        @Body('relativeId') relativeId: string,
    ) {
        const uploadResult = await this.mediaService.uploadImage(file.buffer);
        return this.contributionsService.createMemory(relativeId, 'IMAGE', (uploadResult as any).secure_url);
    }

    @Post('memory')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async addMemory(@Body() createMemoryDto: CreateMemoryDto) {
        const { relativeId, type, url } = createMemoryDto;
        return this.contributionsService.createMemory(relativeId, type, url);
    }
}
