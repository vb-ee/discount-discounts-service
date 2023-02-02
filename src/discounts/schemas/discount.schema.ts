import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type DiscountDocument = Discount & Document;

@Schema({
  timestamps: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Discount {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  discount: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop()
  expiryAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
