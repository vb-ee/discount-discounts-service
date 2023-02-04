import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { Discount, DiscountSchema } from './schemas/discount.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { sendMessage } from '@payhasly-discount/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Discount.name,
        useFactory: () => {
          const schema = DiscountSchema;
          schema
            .post('save', async function () {
              const discount = this.toJSON();
              delete discount.category;
              await sendMessage(
                'AMQP_URL',
                JSON.stringify({ id: this._id, ...discount }),
                'createDiscount',
              );
            })
            .post('deleteOne', async function () {
              await sendMessage(
                'AMQP_URL',
                this._id.toString(),
                'deleteDiscount',
              );
            })
            .post('updateOne', async function () {
              const discount = this.toJSON();
              delete discount.category;
              await sendMessage(
                'AMQP_URL',
                JSON.stringify({ id: this._id, ...discount }),
                'updateDiscount',
              );
            });
          return schema;
        },
      },
    ]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
