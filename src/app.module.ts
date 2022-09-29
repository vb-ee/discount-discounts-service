import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountsModule } from './discounts/discounts.module';

@Module({
  imports: [
    DiscountsModule,
    MongooseModule.forRoot('mongodb://discounts-service-db:27017/discounts'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
