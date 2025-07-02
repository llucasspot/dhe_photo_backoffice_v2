import { IsArray, IsNumber, Min, ValidateNested } from 'class-validator';

import { plainToInstance, Type } from '#class-transformer';
import { Dto } from '#core/domain';

class LayerBody extends Dto<LayerBody> {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;

  @IsNumber()
  @Min(1)
  width!: number;

  @IsNumber()
  @Min(1)
  height!: number;
}

class CanvasBody extends Dto<CanvasBody> {
  @IsNumber()
  @Min(1)
  height!: number;

  @IsNumber()
  @Min(1)
  width!: number;
}

export class TemplateBody extends Dto<TemplateBody> {
  @IsArray()
  @ValidateNested()
  @Type(() => LayerBody)
  layers!: LayerBody[];

  @ValidateNested()
  @Type(() => CanvasBody)
  canvas!: CanvasBody;

  static build<TBody extends TemplateBody>(body: TBody[]): TemplateBody[];
  static build<TBody extends TemplateBody>(body: TBody): TemplateBody;
  static build(body: unknown): TemplateBody | TemplateBody[] {
    return plainToInstance(this, body);
  }
}
