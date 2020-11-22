import AWS from 'aws-sdk';
import { MOCK_MODE } from '../config/env';

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
} from '../config/env';

export interface AwsUploadResponse {
  Etag?: string;
  Location?: string;
  Key?: string;
  Bucket?: string;
}

const mockModeResponse: AwsUploadResponse = {
  Etag: 'mock-e-tag',
  Location: 'mock-Location',
  Key: 'mock-key',
  Bucket: S3_BUCKET_NAME,
};

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
        if (MOCK_MODE) {
          return resolve(mockModeResponse);
        }
        return resolve(data);
      });
    });
  }
}

export default AwsS3Integration;
