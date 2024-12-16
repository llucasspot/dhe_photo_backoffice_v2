import { v4 as uuidv4 } from 'uuid';

import { CanvasConfig } from '#features/products/react';

export class LayerConfig {
  id: string = uuidv4();
  frontHeight: number = 200;
  frontWidth: number = 200;
  frontX: number = 0;
  frontY: number = 0;

  get x() {
    return this.frontX / CanvasConfig.FRONT_COEFFICIENT;
  }

  get y() {
    return this.frontY / CanvasConfig.FRONT_COEFFICIENT;
  }

  get height() {
    return this.frontHeight / CanvasConfig.FRONT_COEFFICIENT;
  }

  get width() {
    return this.frontWidth / CanvasConfig.FRONT_COEFFICIENT;
  }
}
