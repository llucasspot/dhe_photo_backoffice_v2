import { ComponentProps, useCallback } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { useTemplate } from '../../context';
import { LayerConfig } from '../../types';

export function Canvas() {
  const { layers, selectedLayer, canvasConfigFront } = useTemplate();

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      selectedLayer.set(null);
    }
  };

  return (
    <div className="relative">
      <Stage
        height={canvasConfigFront.height}
        width={canvasConfigFront.width}
        style={{ border: '1px solid #ccc' }}
        onClick={handleStageClick}
      >
        <Layer>
          {layers.getAll().map((layer) => (
            <KonvaLayer
              key={layer.id}
              layer={layer}
              state={
                layer.id === selectedLayer.get()?.id ? 'selected' : 'unselected'
              }
              onClick={() => selectedLayer.set(layer)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

function KonvaLayer({
  layer,
  state,
  onClick,
}: {
  layer: LayerConfig;
  state: 'selected' | 'unselected';
  onClick: () => void;
}) {
  const { canvasConfigFront, layers } = useTemplate();

  const findNearestPosition = useCallback(
    (x: number, y: number) => {
      const otherLayers = layers.getAll().filter((l) => l.id !== layer.id);
      let finalX = x;
      let finalY = y;

      otherLayers.forEach((otherLayer) => {
        // Check horizontal overlap
        const horizontalOverlap =
          x < otherLayer.x + otherLayer.width && x + layer.width > otherLayer.x;
        // Check vertical overlap
        const verticalOverlap =
          y < otherLayer.y + otherLayer.height &&
          y + layer.height > otherLayer.y;

        if (horizontalOverlap && verticalOverlap) {
          // Calculate distances to each edge of the other layer
          const distToRight = Math.abs(otherLayer.x + otherLayer.width - x);
          const distToLeft = Math.abs(x + layer.width - otherLayer.x);
          const distToBottom = Math.abs(otherLayer.y + otherLayer.height - y);
          const distToTop = Math.abs(y + layer.height - otherLayer.y);

          // Find the smallest distance
          const minDist = Math.min(
            distToRight,
            distToLeft,
            distToBottom,
            distToTop,
          );

          // Snap to the nearest edge
          if (minDist === distToRight) {
            finalX = otherLayer.x + otherLayer.width;
          } else if (minDist === distToLeft) {
            finalX = otherLayer.x - layer.width;
          } else if (minDist === distToBottom) {
            finalY = otherLayer.y + otherLayer.height;
          } else if (minDist === distToTop) {
            finalY = otherLayer.y - layer.height;
          }
        }
      });

      // Ensure we stay within canvas bounds
      finalX = Math.max(
        0,
        Math.min(finalX, canvasConfigFront.width - layer.width),
      );
      finalY = Math.max(
        0,
        Math.min(finalY, canvasConfigFront.height - layer.height),
      );

      return { x: finalX, y: finalY };
    },
    [layers, canvasConfigFront, layer],
  );

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const node = e.target;

    // Get initial position within stage bounds
    const rawX = Math.max(
      0,
      Math.min(node.x(), canvasConfigFront.width - layer.width),
    );
    const rawY = Math.max(
      0,
      Math.min(node.y(), canvasConfigFront.height - layer.height),
    );

    // Find nearest non-overlapping position
    const { x: newX, y: newY } = findNearestPosition(rawX, rawY);

    // Update position
    node.x(newX);
    node.y(newY);
  };

  const styles = {
    selected: {
      stroke: '#00ff00',
      strokeWidth: 2,
      cornerRadius: 5,
    },
    unselected: {
      stroke: '#999',
      strokeWidth: 1,
    },
  } as const satisfies Record<typeof state, ComponentProps<typeof Rect>>;

  const style = styles[state];

  return (
    <Rect
      {...style}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      fill="#ddd"
      onClick={onClick}
      draggable
      onDragMove={handleDragMove}
      onDragEnd={(e) => {
        const node = e.target;
        layer.x = node.x();
        layer.y = node.y();
      }}
    />
  );
}
