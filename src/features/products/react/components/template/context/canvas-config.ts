import { Transform } from '#class-transformer';

export class CanvasConfig {
  static FRONT_COEFFICIENT = 2 as const;

  frontHeight: number;
  frontWidth: number;

  constructor({ height, width }: { height: number; width: number }) {
    this.frontHeight = height * CanvasConfig.FRONT_COEFFICIENT;
    this.frontWidth = width * CanvasConfig.FRONT_COEFFICIENT;
  }

  @Transform(({ obj }) => obj.frontHeight / CanvasConfig.FRONT_COEFFICIENT)
  getHeight() {
    return this.frontHeight / CanvasConfig.FRONT_COEFFICIENT;
  }

  @Transform(({ obj }) => obj.frontHeight / CanvasConfig.FRONT_COEFFICIENT)
  getWidth() {
    return this.frontWidth / CanvasConfig.FRONT_COEFFICIENT;
  }
}
