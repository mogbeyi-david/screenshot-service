import AwsS3Integration from '../integrations/aws-s3-integration';
import { S3_BUCKET_NAME } from '../config/env';
import { generateRandomString } from '../util/generate-random-string';
import { TIME_VALUES_IN_MILLISECONDS } from '../config/constants';
import { redisAsync } from '../util/redis';

class ImageService {
  public static async upload(
    imageFile: Buffer,
    name: string,
    mimetype = 'image/png',
  ) {
    const awsResponse = await AwsS3Integration.uploadToBucket({
      Bucket: S3_BUCKET_NAME,
      Body: imageFile,
      Key: `${name}-${generateRandomString()}`,
      ACL: 'public-read',
      ContentType: mimetype,
    });
    return awsResponse.Location;
  }

  public static async setInRedis(
    url: string,
    screenshot: string,
    duration: number = TIME_VALUES_IN_MILLISECONDS.TWELVE_HOURS,
  ) {
    const redisResponse = await redisAsync.set(url, screenshot, 'EX', duration);
    console.log('redisResponse', redisResponse);
    return redisResponse;
  }
}

export default ImageService;
