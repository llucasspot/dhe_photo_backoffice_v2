export class CanvasConfig {
  static FRONT_COEFFICIENT = 2 as const;

  frontHeight: number;
  frontWidth: number;

  constructor({ height, width }: Pick<CanvasConfig, 'height' | 'width'>) {
    this.frontHeight = height * CanvasConfig.FRONT_COEFFICIENT;
    this.frontWidth = width * CanvasConfig.FRONT_COEFFICIENT;
  }

  get height() {
    return this.frontHeight / CanvasConfig.FRONT_COEFFICIENT;
  }

  get width() {
    return this.frontWidth * CanvasConfig.FRONT_COEFFICIENT;
  }
}
