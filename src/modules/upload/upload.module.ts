import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_PATH } from '../../common/constants';
import { editFileName } from '../../common/utils/file-utils';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: editFileName,
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
