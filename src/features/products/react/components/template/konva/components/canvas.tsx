import { ComponentProps } from 'react';
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
  const { canvasConfigFront } = useTemplate();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    // Get the new position
    const node = e.target;
    const newX = Math.max(
      0,
      Math.min(node.x(), canvasConfigFront.width - layer.width),
    );
    const newY = Math.max(
      0,
      Math.min(node.y(), canvasConfigFront.height - layer.height),
    );
    // Update the position
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
        // Update layer position in state if needed
        const node = e.target;
        layer.x = node.x();
        layer.y = node.y();
      }}
    />
  );
}
