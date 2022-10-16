import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { awsS3Config } from '../../config/aws-s3.config';
import { FileResponseDto } from './dto/file-response.dto';

@Injectable()
export class awsS3UploadService {
  private s3!: S3;
  constructor(
    @Inject(awsS3Config.KEY)
    private config: ConfigType<typeof awsS3Config>
  ) {
    this.s3 = new S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<FileResponseDto> {
    const { originalname } = file;

    return await this.uploadToS3(
      file.buffer,
      this.config.bucket,
      originalname,
      file.mimetype
    );
  }

  private async uploadToS3(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string
  ): Promise<FileResponseDto> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      //createBundleRenderer
      // CreateBucketConfiguration: {
      //   LocationConstraint: 'ap-south-1',
      // },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return new FileResponseDto(
        s3Response.Key,
        s3Response.Key,
        s3Response.Location
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Error Trying to upload to S3');
    }
  }
}
