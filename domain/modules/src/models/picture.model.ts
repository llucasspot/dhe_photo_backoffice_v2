import { Model } from '@domain/core';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PictureModel extends Model<PictureModel> {}

export class KlassPictureModel extends Model<PictureModel> {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  klassId?: string;
}

export class StudentPictureModel extends Model<PictureModel> {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  studentId?: string;
}
