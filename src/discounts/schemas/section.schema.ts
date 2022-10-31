import { Schema, createConnection } from 'mongoose';

const sectionDatabase = createConnection(
  'mongodb://sections-service-db:27017/sections',
);
// Create an interface representing a document in MongoDB.
export interface ISection {
  title: string;
}

// Create a Schema corresponding to the document interfaces.
export const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
});

export const Section = sectionDatabase.model('Section', sectionSchema);
