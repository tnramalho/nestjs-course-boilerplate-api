import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  refreshToken!: string;
}
