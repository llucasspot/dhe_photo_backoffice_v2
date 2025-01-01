import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';

export class PictureDto extends Dto<PictureDto> {
  // properties
  id!: string;

  static build<TBody>(body: TBody[]): PictureDto[];
  static build<TBody>(body: TBody): PictureDto;
  static build(body: unknown): PictureDto | PictureDto[] {
    return plainToInstance(this, body);
  }
}
