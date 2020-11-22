import '../../typings/mongoose';
import { DeleteModel } from 'mongoose';
import { db } from '../util/mongo';
import { IScreenShot, ScreenShotSchema } from './screenshots';

export const Screenshot = db.model<IScreenShot>(
  'ScreenShot',
  ScreenShotSchema,
) as DeleteModel<IScreenShot>;