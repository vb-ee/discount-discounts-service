import { Schema, createConnection } from 'mongoose';

const categoryDatabase = createConnection(
  'mongodb://categories-service-db/categories',
);
// Create an interface representing a document in MongoDB.
export interface ICategory {
  title: string;
  color: string;
  imageUrl: string;
}

// Create a Schema corresponding to the document interfaces.
export const categorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  color: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Category = categoryDatabase.model('Category', categorySchema);
