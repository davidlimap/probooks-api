import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';
import { LivroModule } from './livro/livro.module';
import { CategoriaModule } from './categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AutorModule,
    LivroModule,
    CategoriaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService],
    }),
  ],
})
export class AppModule { }
