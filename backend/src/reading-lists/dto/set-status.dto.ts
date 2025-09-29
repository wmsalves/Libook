import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReadingStatus } from '@prisma/client';

export class SetStatusDto {
  @IsNotEmpty()
  @IsEnum(ReadingStatus)
  status: ReadingStatus;
}
