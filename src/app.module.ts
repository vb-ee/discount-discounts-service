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
import { SectionsModule } from './sections/sections.module';
import {
  restrictToAdmin,
  authHandler,
  Tokens,
} from '@payhasly-discount/common';
import { CategoriesController } from './categories/categories.controller';
import { SectionsController } from './sections/sections.controller';
import { uploadImage } from './middleware/uploadImage.middleware';

@Module({
  imports: [
    DiscountsModule,
    MongooseModule.forRoot(<string>process.env.MONGO_DB_URI),
    CategoriesModule,
    SectionsModule,
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
      .apply(authHandler(Tokens.accessToken, 'JWT_ACCESS'), restrictToAdmin())
      .exclude(
        { path: 'sections', method: RequestMethod.GET },
        { path: 'sections/:id', method: RequestMethod.GET },
        { path: 'sections/:id/discounts', method: RequestMethod.GET },
      )
      .forRoutes(SectionsController);
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
