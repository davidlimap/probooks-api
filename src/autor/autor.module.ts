import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorController } from './autor.controller';
import { AutorRepository } from './autor.repository';
import { EmailUnicoValidator } from './validacoes/emailUnico.validator';
import { AutorService } from './autor.service';
import { AutorEntity } from './autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity])],
  controllers: [AutorController],
  providers: [AutorService, AutorRepository, EmailUnicoValidator],
})
export class AutorModule { }