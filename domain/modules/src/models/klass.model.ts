import { Model } from '@domain/core';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class KlassModel extends Model<KlassModel> {
  @IsString()
  name!: string;
}

export class ProjectKlassModel extends KlassModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  projectId!: string;
}
