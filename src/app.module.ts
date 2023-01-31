import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricModule } from './metric/metric.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:BGQr818d2QpbVg8Ooyob@containers-us-west-135.railway.app:6461',
    ),
    MetricModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
