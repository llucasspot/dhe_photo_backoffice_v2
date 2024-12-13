import React from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { LayerConfig as LayerType } from '../../../types';
import { Layer } from '../layer';

import { CanvasConfig } from '#features/products/react';

type CanvasProps = {
  canvas: CanvasConfig;
  layers: LayerType[];
  onLayerUpdate: (updatedLayer: LayerType) => void;
  onLayerRemove: (layerId: string) => void;
};

export const Canvas: React.FC<CanvasProps> = ({
  canvas,
  layers,
  onLayerUpdate,
  onLayerRemove,
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const layer = layers.find((l) => l.id === active.id);

    if (layer) {
      let newX = layer.x + delta.x;
      let newY = layer.y + delta.y;

      // Apply canvas boundary constraints
      newX = Math.max(0, Math.min(canvas.frontWidth - layer.frontWidth, newX));
      newY = Math.max(
        0,
        Math.min(canvas.frontHeight - layer.frontHeight, newY),
      );

      layer.x = newX;
      layer.y = newY;

      onLayerUpdate(layer);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="bg-gray-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div
            className="relative mx-auto"
            style={{
              height: `${canvas.frontHeight}px`,
              width: `${canvas.frontWidth}px`,
            }}
          >
            {layers.map((layer) => (
              <Layer
                key={layer.id}
                layer={layer}
                onUpdate={onLayerUpdate}
                onRemove={onLayerRemove}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};
