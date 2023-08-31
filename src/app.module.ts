import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { AppService } from './app.service';
import { ChurchesModule } from './churches/churches.module';

@Module({
  imports: [ChurchesModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
