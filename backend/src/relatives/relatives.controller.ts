import { Controller, Get, Param } from '@nestjs/common';
import { RelativesService } from './relatives.service';

@Controller('relatives')
export class RelativesController {
    constructor(private readonly relativesService: RelativesService) { }

    @Get()
    findAll() {
        return this.relativesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.relativesService.findOne(id);
    }
}
