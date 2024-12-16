import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

import { LayerControls } from './layer-controls';

import { LayerConfig as LayerType } from '#features/products/react';

type LayerProps = {
  layer: LayerType;
  onUpdate: (updatedLayer: LayerType) => void;
  onRemove: (layerId: string) => void;
};

export const Layer: React.FC<LayerProps> = ({ layer, onUpdate, onRemove }) => {
  const [imageUrl] = useState(
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1440&q=80',
  );
  // const layerRef = useRef<HTMLDivElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: dragTransform,
  } = useDraggable({
    id: layer.id,
  });

  const style = {
    transform: dragTransform
      ? `translate(${dragTransform.x}px, ${dragTransform.y}px)`
      : undefined,
    height: `${layer.frontHeight}px`,
    width: `${layer.frontWidth}px`,
    left: `${layer.frontX}px`,
    top: `${layer.frontY}px`,
  } as const;

  const handleResizeStart = (corner: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startHeight = layer.frontHeight;
    const startWidth = layer.frontWidth;
    const startLeft = layer.frontX;
    const startTop = layer.frontY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newHeight = startHeight;
      let newWidth = startWidth;
      let newX = startLeft;
      let newY = startTop;

      if (corner.includes('right')) {
        newWidth = Math.max(50, Math.min(500, startWidth + deltaX));
      } else if (corner.includes('left')) {
        const possibleWidth = Math.max(50, Math.min(500, startWidth - deltaX));
        if (possibleWidth !== startWidth) {
          newX = startLeft + (startWidth - possibleWidth);
          newWidth = possibleWidth;
        }
      }

      if (corner.includes('bottom')) {
        newHeight = Math.max(50, Math.min(500, startHeight + deltaY));
      } else if (corner.includes('top')) {
        const possibleHeight = Math.max(
          50,
          Math.min(500, startHeight - deltaY),
        );
        if (possibleHeight !== startHeight) {
          newY = startTop + (startHeight - possibleHeight);
          newHeight = possibleHeight;
        }
      }

      layer.frontHeight = newHeight;
      layer.frontWidth = newWidth;
      layer.frontX = newX;
      layer.frontY = newY;

      onUpdate(layer);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="absolute bg-gray-200 border-2 border-blue-500 hover:border-blue-600 cursor-move group"
    >
      <LayerControls
        handleResizeStart={handleResizeStart}
        layer={layer}
        onRemove={onRemove}
      />

      <img
        src={imageUrl}
        alt={`Layer ${layer.id}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
