import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { serverConfig } from '../../../config/server.config';

@Exclude()
export class FileResponseDto {
  constructor(_originalname: string, _filename: string, _url: string) {
    this.filename = _filename;
    this.originalname = _originalname;
    this.url = _url;
  }
  @ApiProperty({
    title: 'Original file name',
    description: 'The username of user.',
  })
  @IsString()
  @Expose()
  originalname!: string;

  @ApiProperty({
    title: 'File name',
    description: 'The username of user.',
  })
  @IsString()
  @Expose()
  filename!: string;

  @Expose()
  url?: string;
}
