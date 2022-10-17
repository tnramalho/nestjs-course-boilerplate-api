import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class EmailDto {
  @ApiProperty()
  @Expose()
  @IsString()
  to!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  firstName!: string;
}
