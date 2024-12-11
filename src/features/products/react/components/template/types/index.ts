import { v4 as uuidv4 } from 'uuid';

export class LayerConfig {
  id: string = uuidv4();
  width: number = 200;
  height: number = 200;
  x: number = 0;
  y: number = 0;
}

export type CanvasConfig = {
  width: number;
  height: number;
};

export type NewLayerDimensions = {
  width: number;
  height: number;
};

export type TemplateConfig = {
  canvas: CanvasConfig;
  layers: LayerConfig[];
};
