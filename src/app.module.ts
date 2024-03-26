import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [AutorModule],
})
export class AppModule { }
