import { registerAs } from '@nestjs/config';
import AwsS3ConfigInterface from '../modules/upload/interfaces/aws-s3-config.interface';

export const awsS3Config = registerAs(
  'AWS_MODULE_S3_CONFIG',
  (): AwsS3ConfigInterface => {
    return {
      accessKeyId: process.env?.AWS_S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env?.AWS_S3_KEY_SECRET ?? '',
      bucket: process.env?.AWS_S3_BUCKET ?? '',
    };
  }
);
