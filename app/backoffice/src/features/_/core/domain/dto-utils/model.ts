import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Model<T extends object> {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  constructor(instance: T & { id: string }) {
    Object.assign(this, instance);
  }
}
