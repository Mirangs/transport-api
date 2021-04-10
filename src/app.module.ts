import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from './transport/transport.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [TransportModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
