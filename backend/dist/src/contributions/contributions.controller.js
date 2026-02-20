"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const contributions_service_1 = require("./contributions.service");
const media_service_1 = require("../media/media.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const create_memory_dto_1 = require("./dto/create-memory.dto");
let ContributionsController = class ContributionsController {
    contributionsService;
    mediaService;
    constructor(contributionsService, mediaService) {
        this.contributionsService = contributionsService;
        this.mediaService = mediaService;
    }
    async addComment(createCommentDto) {
        const { relativeId, author, text } = createCommentDto;
        return this.contributionsService.createComment(relativeId, author, text);
    }
    async uploadMemory(file, relativeId) {
        const uploadResult = await this.mediaService.uploadImage(file.buffer);
        return this.contributionsService.createMemory(relativeId, 'IMAGE', uploadResult.secure_url);
    }
    async addMemory(createMemoryDto) {
        const { relativeId, type, url } = createMemoryDto;
        return this.contributionsService.createMemory(relativeId, type, url);
    }
};
exports.ContributionsController = ContributionsController;
__decorate([
    (0, common_1.Post)('comment'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('upload-memory'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('relativeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "uploadMemory", null);
__decorate([
    (0, common_1.Post)('memory'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_memory_dto_1.CreateMemoryDto]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "addMemory", null);
exports.ContributionsController = ContributionsController = __decorate([
    (0, common_1.Controller)('contributions'),
    __metadata("design:paramtypes", [contributions_service_1.ContributionsService,
        media_service_1.MediaService])
], ContributionsController);
//# sourceMappingURL=contributions.controller.js.map