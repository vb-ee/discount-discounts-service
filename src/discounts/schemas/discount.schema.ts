import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { Section } from 'src/sections/schemas/section.schema';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: false })
export class Discount {
  @Prop()
  title: string;

  @Prop()
  discount: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop()
  expiryDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Section' })
  section: Section;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
