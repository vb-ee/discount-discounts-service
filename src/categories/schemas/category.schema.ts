import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Category {
  @Prop()
  title: string;

  @Prop()
  color: string;

  @Prop()
  imageUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
