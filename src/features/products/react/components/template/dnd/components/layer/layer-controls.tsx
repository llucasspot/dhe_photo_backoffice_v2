import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import { LayerConfig } from '#features/products/react';

type LayerControlsProps = {
  layer: LayerConfig;
  onRemove: (layerId: string) => void;
  handleResizeStart: (corner: string, e: React.MouseEvent) => void;
};

export const LayerControls: React.FC<LayerControlsProps> = ({
  layer,
  onRemove,
  handleResizeStart,
}) => {
  const RemoveButton = () => {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(layer.id);
        }}
        className="absolute top-1 right-1 m-1 p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
        title="Remove Layer"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    );
  };

  return (
    <div>
      <RemoveButton />
      <div
        className="absolute w-3 h-3 bottom-0 right-0 bg-blue-500 cursor-se-resize"
        onMouseDown={(e) => handleResizeStart('bottom-right', e)}
      />
      <div
        className="absolute w-3 h-3 bottom-0 left-0 bg-blue-500 cursor-sw-resize"
        onMouseDown={(e) => handleResizeStart('bottom-left', e)}
      />
      <div
        className="absolute w-3 h-3 top-0 right-0 bg-blue-500 cursor-ne-resize"
        onMouseDown={(e) => handleResizeStart('top-right', e)}
      />
      <div
        className="absolute w-3 h-3 top-0 left-0 bg-blue-500 cursor-nw-resize"
        onMouseDown={(e) => handleResizeStart('top-left', e)}
      />
    </div>
  );
};
