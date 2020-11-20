import AWS from 'aws-sdk';

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config/env';

export interface AwsUploadResponse {
  Etag?: string;
  Location?: string;
  Key?: string;
  Bucket?: string;
}

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
class AwsS3Integration {
  public static uploadToBucket(parameters: {
    Bucket: string;
    Body: any;
    Key: string;
    ACL?: string;
    ContentType?: string;
  }): Promise<AwsUploadResponse> {
    return new Promise((resolve, reject) => {
      s3.upload(parameters, (error: any, data: AwsUploadResponse) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }
}

export default AwsS3Integration;
