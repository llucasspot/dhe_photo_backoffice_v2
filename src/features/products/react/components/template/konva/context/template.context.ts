import { createContext } from 'react';

import { LayerConfig } from '../../types';

import { StateValue, useObjectArray } from '#core/react';

type CanvasConfig = {
  width: number;
  height: number;
};

type TemplateContextType = {
  canvasConfig: CanvasConfig;
  layers: ReturnType<typeof useObjectArray<LayerConfig>>;
  selectedLayer: StateValue<LayerConfig | null>;
};

export const TemplateContext = createContext<TemplateContextType | null>(null);
