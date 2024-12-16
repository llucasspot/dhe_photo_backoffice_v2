import React from 'react';

import { LayerForm } from './layer-form';

import { NewLayerDimensions } from '#features/products/react';

type CanvasControlsProps = {
  onAddLayer: (dimensions: NewLayerDimensions) => void;
};

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  onAddLayer,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Layer</h2>
        <LayerForm onAddLayer={onAddLayer} />
      </div>
    </div>
  );
};
