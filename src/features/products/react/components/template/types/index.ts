export type LayerConfig = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

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
