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
import { CategoriesModule } from './categories/categories.module';
import {
  restrictToAdmin,
  authHandler,
  Tokens,
  accessEnv,
} from '@payhasly-discount/common';
import { CategoriesController } from './categories/categories.controller';
import { uploadImage } from './middleware/uploadImage.middleware';
import { Discount, DiscountSchema } from './discounts/schemas/discount.schema';

@Module({
  imports: [
    DiscountsModule,
    MongooseModule.forRoot(accessEnv('MONGO_DB_URI')),
    CategoriesModule,
    MongooseModule.forFeatureAsync([
      {
        name: Discount.name,
        useFactory: () => {
          const schema = DiscountSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authHandler(Tokens.accessToken, 'JWT_ACCESS'), restrictToAdmin())
      .exclude(
        { path: 'discounts', method: RequestMethod.GET },
        { path: 'discounts/:id', method: RequestMethod.GET },
      )
      .forRoutes(DiscountsController);
    consumer
      .apply(authHandler(Tokens.accessToken, 'JWT_ACCESS'), restrictToAdmin())
      .exclude(
        { path: 'categories', method: RequestMethod.GET },
        { path: 'categories/:id', method: RequestMethod.GET },
        { path: 'categories/:id/discounts', method: RequestMethod.GET },
      )
      .forRoutes(CategoriesController);
    consumer
      .apply(uploadImage.single('category'))
      .forRoutes(
        { path: 'categories', method: RequestMethod.POST },
        { path: 'categories/:id', method: RequestMethod.PATCH },
      );
    consumer
      .apply(uploadImage.single('discount'))
      .forRoutes(
        { path: 'discounts', method: RequestMethod.POST },
        { path: 'discounts/:id', method: RequestMethod.PATCH },
      );
  }
}
