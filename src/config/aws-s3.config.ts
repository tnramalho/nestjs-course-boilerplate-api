import { registerAs } from '@nestjs/config';
import AwsS3ConfigInterface from '../modules/upload/interfaces/aws-s3-config.interface';

export const awsS3Config = registerAs(
  'AWS_MODULE_S3_CONFIG',
  (): AwsS3ConfigInterface => {
    return {
      accessKeyId: process.env?.BUCKETEER_AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env?.BUCKETEER_AWS_SECRET_ACCESS_KEY ?? '',
      bucket: process.env?.BUCKETEER_BUCKET_NAME ?? '',
    };
  }
);
