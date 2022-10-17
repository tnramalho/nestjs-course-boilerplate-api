import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { UPLOAD_PATH } from '../../common/constants';
import { ApiFileDecorator } from '../../common/decorators/api-file-decorator';
import { imageFileFilter } from '../../common/utils/file-utils';
import { awsS3UploadService } from './aws-s3-upload.service';

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
//@UseGuards(RolesGuard)
//@UseGuards(JwtAuthGuard)
//@Roles(RoleEnum.Admin)
export class UploadController {
  constructor(private s3Service: awsS3UploadService) {}
  @Post('file')
  @ApiFileDecorator()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.s3Service.uploadFile(file);
    return instanceToPlain(response);
  }

  @Get(':path')
  viewImage(@Param('path') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: UPLOAD_PATH });
  }
}
