import { createContext } from 'react';

import { LayerConfig } from '../types';

import { ObjectArrayState, StateValue } from '#core/react';

type CanvasConfig = {
  width: number;
  height: number;
};

type TemplateContextType = {
  canvasConfig: CanvasConfig;
  canvasConfigFront: CanvasConfig;
  layers: ObjectArrayState<LayerConfig>;
  selectedLayer: StateValue<LayerConfig | null>;
};

export const TemplateContext = createContext<TemplateContextType | null>(null);
