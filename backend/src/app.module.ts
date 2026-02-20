import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RelativesModule } from './relatives/relatives.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContributionsModule } from './contributions/contributions.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [PrismaModule, RelativesModule, ContributionsModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
