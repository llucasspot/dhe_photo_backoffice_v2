import { Model } from '@domain/core';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class StudentModel extends Model<StudentModel> {
  @IsString()
  code!: string;
}

export class KlassStudentModel extends StudentModel {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  klassId!: string;
}
