import React from 'react';

import { CanvasConfig, NewLayerDimensions } from '../../../types';

import { LayerForm } from './layer-form';

import { StateValue } from '#core/react';

type CanvasControlsProps = {
  canvasValue: StateValue<CanvasConfig>;
  onAddLayer: (dimensions: NewLayerDimensions) => void;
};

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  canvasValue,
  onAddLayer,
}) => {
  const canvas = canvasValue.get();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Canvas Settings</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Width (px)
            </label>
            <input
              type="number"
              value={canvas.width}
              onChange={(e) =>
                canvasValue.set({
                  ...canvas,
                  width: parseInt(e.target.value) || 0,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Height (px)
            </label>
            <input
              type="number"
              value={canvas.height}
              onChange={(e) =>
                canvasValue.set({
                  ...canvas,
                  height: parseInt(e.target.value) || 0,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Layer</h2>
        <LayerForm onAddLayer={onAddLayer} />
      </div>
    </div>
  );
};
