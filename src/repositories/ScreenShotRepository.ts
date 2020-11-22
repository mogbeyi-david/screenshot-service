import { IScreenShot } from '../models/screenshots';
import { Screenshot } from '../models';

class ScreenShotRepository {
  public async create({
    name,
    link,
    identifier,
  }: {
    name: string;
    link: string;
    identifier: string;
  }): Promise<IScreenShot> {
    return Screenshot.create({ name, link, identifier });
  }
}

export default new ScreenShotRepository();
