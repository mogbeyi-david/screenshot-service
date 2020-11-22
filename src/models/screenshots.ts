import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

export interface IScreenShot extends mongoose.Document {
  name: string;
  link: string;
  identifier: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ScreenShotSchema = new Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    identifier: { type: String, required: true },
  },
  { timestamps: true },
);

ScreenShotSchema.plugin(mongooseDelete);
