import { IsArray, IsNumber, Min, ValidateNested } from 'class-validator';

import { plainToInstance, Type } from '#class-transformer';
import { Dto } from '#core/domain';

class LayerBody extends Dto<LayerBody> {
  @IsNumber(
    {},
    { message: 'products.create.validation.template.layers.item.x.IsNumber' },
  )
  x!: number;

  @IsNumber(
    {},
    { message: 'products.create.validation.template.layers.item.y.IsNumber' },
  )
  y!: number;

  @IsNumber(
    {},
    {
      message: 'products.create.validation.template.layers.item.width.IsNumber',
    },
  )
  @Min(1, {
    message: 'products.create.validation.template.layers.item.width.Min',
  })
  width!: number;

  @IsNumber(
    {},
    {
      message:
        'products.create.validation.template.layers.item.height.IsNumber',
    },
  )
  @Min(1, {
    message: 'products.create.validation.template.layers.item.height.Min',
  })
  height!: number;
}

class CanvasBody extends Dto<CanvasBody> {
  @IsNumber(
    {},
    { message: 'products.create.validation.template.canvas.IsNumber' },
  )
  @Min(1, { message: 'products.create.validation.template.canvas.Min' })
  height!: number;

  @IsNumber(
    {},
    { message: 'products.create.validation.template.canvas.IsNumber' },
  )
  @Min(1, { message: 'products.create.validation.template.canvas.Min' })
  width!: number;
}

export class TemplateBody extends Dto<TemplateBody> {
  @IsArray({ message: 'products.create.validation.template.layers.IsArray' })
  @ValidateNested({
    each: true,
    message: 'products.create.validation.template.layers.ValidateNested',
  })
  @Type(() => LayerBody)
  layers!: LayerBody[];

  @ValidateNested({
    message: 'products.create.validation.template.ValidateNested',
  })
  @Type(() => CanvasBody)
  canvas!: CanvasBody;

  static build<TBody extends TemplateBody>(body: TBody[]): TemplateBody[];
  static build<TBody extends TemplateBody>(body: TBody): TemplateBody;
  static build(body: unknown): TemplateBody | TemplateBody[] {
    return plainToInstance(this, body);
  }
}
