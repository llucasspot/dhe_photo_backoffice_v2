import { createContext } from 'react';

import { LayerConfig } from '../types';

import { CanvasConfig } from './canvas-config';

import { StateItems, StateValue } from '#core/react';

type TemplateContextType = {
  canvasConfig: CanvasConfig;
  layers: StateItems<LayerConfig>;
  selectedLayerId: StateValue<LayerConfig['id'] | null>;
};

export const TemplateContext = createContext<TemplateContextType | null>(null);
