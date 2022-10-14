import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_PATH } from '../../common/constants';
import { editFileName } from '../../common/utils/file-utils';
import { awsS3Config } from '../../config/aws-s3.config';
import { awsS3UploadService } from './aws-s3-upload.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [ConfigModule.forFeature(awsS3Config)],
  controllers: [UploadController],
  providers: [awsS3UploadService],
})
export class UploadModule {}
