import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { UPLOAD_PATH } from '../../common/constants';
import { ApiFileDecorator } from '../../common/decorators/api-file-decorator';
import { imageFileFilter } from '../../common/utils/file-utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { FileResponseDto } from './dto/file-response.dto';

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
//@UseGuards(RolesGuard)
//@UseGuards(JwtAuthGuard)
//@Roles(RoleEnum.Admin)
export class UploadController {
  @Post('file')
  @ApiFileDecorator()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = new FileResponseDto(file.originalname, file.filename);
    return instanceToPlain(response);
  }

  @Get(':path')
  viewImage(@Param('path') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: UPLOAD_PATH });
  }
}
