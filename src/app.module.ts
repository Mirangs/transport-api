import { Module } from '@nestjs/common';
import { TransportModule } from './transport/transport.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [TransportModule, RouteModule],
})
export class AppModule {}
