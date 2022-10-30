import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsModule } from './discounts/discounts.module';
import { restrictToAdmin } from './middlewares/restrict.middleware';

@Module({
  imports: [
    DiscountsModule,
    MongooseModule.forRoot('mongodb://discounts-service-db:27017/discounts'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(restrictToAdmin)
      .exclude(
        { path: 'discounts', method: RequestMethod.GET },
        { path: 'discounts/:id', method: RequestMethod.GET },
      )
      .forRoutes(DiscountsController);
  }
}
