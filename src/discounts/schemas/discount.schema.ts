import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Category } from './category.schema';
import { Section } from './section.schema';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: false })
export class Discount {
  @Prop()
  title: string;

  @Prop()
  discount: number;

  @Prop()
  quantity: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop()
  expiryDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Section, required: false })
  section: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category, required: false })
  category: Types.ObjectId;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
