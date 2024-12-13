export * from './layer-config';

import { LayerConfig } from './layer-config';

import { CanvasConfig } from '#features/products/react';

export type NewLayerDimensions = {
  height: number;
  width: number;
};

export type TemplateConfig = {
  canvas: CanvasConfig;
  layers: LayerConfig[];
};
