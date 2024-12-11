import { Layer, Rect, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { LayerConfig } from '../../types';
import { useTemplate } from '../context';

export function Canvas() {
  const { canvasConfig, layers, selectedLayer } = useTemplate();
  const { width, height } = canvasConfig;

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      selectedLayer.set(null);
    }
  };

  return (
    <div className="relative">
      <Stage
        width={width * 2}
        height={height * 2}
        style={{ border: '1px solid #ccc' }}
        onClick={handleStageClick}
      >
        <Layer>
          {layers.getAll().map((layer) => (
            <KonvaLayer
              key={layer.id}
              layer={layer}
              isSelected={layer.id === selectedLayer.get()?.id}
              onClick={() => selectedLayer.set(layer)}
              stageWidth={width * 2}
              stageHeight={height * 2}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

function KonvaLayer({
  layer,
  isSelected,
  onClick,
  stageWidth,
  stageHeight,
}: {
  layer: LayerConfig;
  isSelected: boolean;
  onClick: () => void;
  stageWidth: number;
  stageHeight: number;
}) {
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    // Get the new position
    const node = e.target;
    const newX = Math.max(0, Math.min(node.x(), stageWidth - layer.width));
    const newY = Math.max(0, Math.min(node.y(), stageHeight - layer.height));

    // Update the position
    node.x(newX);
    node.y(newY);
  };

  return (
    <Rect
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      fill="#ddd"
      stroke={isSelected ? '#00ff00' : '#999'}
      strokeWidth={isSelected ? 2 : 1}
      onClick={onClick}
      draggable
      onDragMove={handleDragMove}
      onDragEnd={(e) => {
        // Update layer position in state if needed
        const node = e.target;
        layer.x = node.x();
        layer.y = node.y();
      }}
      {...(isSelected && {
        cornerRadius: 5,
        strokeWidth: 2,
      })}
    />
  );
}
