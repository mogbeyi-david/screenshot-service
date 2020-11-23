import AwsS3Integration from '../../src/integrations/aws-s3-integration';
import { S3_BUCKET_NAME } from '../../src/config/env';
import { generateRandomString } from '../../src/util/generate-random-string';

describe('AwsS3Integration', () => {
  describe('uploadToBucket', () => {
    test('should successfully upload to the bucket', async () => {
      const awsResponse = await AwsS3Integration.uploadToBucket({
        Bucket: S3_BUCKET_NAME,
        Body: Buffer.from(''),
        Key: generateRandomString(),
        ACL: 'public-read',
        ContentType: 'image/jpg',
      });
      expect(awsResponse.Location).toBeDefined();
    });
  });
});
