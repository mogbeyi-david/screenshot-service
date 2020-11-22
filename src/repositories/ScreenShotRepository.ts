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

  public async getByIdentifier(
    identifier: string,
    leanVersion = true,
  ): Promise<IScreenShot | null> {
    return Screenshot.findOne({ identifier }).lean(leanVersion);
  }

  public async deleteAll(){
    return Screenshot.deleteMany({});
  }
}

export default new ScreenShotRepository();
