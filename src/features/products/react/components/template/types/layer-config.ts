import { v4 as uuidv4 } from 'uuid';

import { CanvasConfig } from '#features/products/react';

export class LayerConfig {
  id: string = uuidv4();
  frontHeight: number = 200;
  frontWidth: number = 200;
  x: number = 0;
  y: number = 0;

  get height() {
    return this.frontHeight / CanvasConfig.FRONT_COEFFICIENT;
  }

  get width() {
    return this.frontWidth / CanvasConfig.FRONT_COEFFICIENT;
  }
}
