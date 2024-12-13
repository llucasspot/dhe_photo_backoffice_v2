import {
  ComponentProps,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Box } from 'konva/lib/shapes/Transformer';

import { useTemplate } from '../../context';
import { LayerConfig } from '../../types';

import { ArrayStateController } from '#core/react';

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
          {ArrayStateController.getAll(layers).map((layer) => (
            <KonvaLayer
              key={layer.id}
              layer={layer}
              state={
                layer.id === selectedLayer.get?.id ? 'selected' : 'unselected'
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
  const shapeRef = useRef<Konva.Rect>(null);

  const findNearestPosition = useCallback(
    (x: number, y: number) => {
      const otherLayers = ArrayStateController.getAll(layers).filter(
        (l) => l.id !== layer.id,
      );
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

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    ArrayStateController.update(layers, layer.id, {
      x: node.x(),
      y: node.y(),
    });
  };

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

  const handleTransformEnd = () => {
    if (!shapeRef.current) return;

    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale to 1 and adjust width/height instead
    node.scaleX(1);
    node.scaleY(1);

    ArrayStateController.update(layers, layer.id, {
      // x: node.x(),
      // y: node.y(),
      width: Math.max(node.width() * scaleX, 50), // Minimum width of 50
      height: Math.max(node.height() * scaleY, 50), // Minimum height of 50
    });
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
    <>
      <Rect
        {...style}
        ref={shapeRef}
        x={layer.x}
        y={layer.y}
        width={layer.width}
        height={layer.height}
        fill="#ddd"
        onClick={onClick}
        draggable
        onDragMove={handleDragMove}
        onDragEnd={onDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      <KonvaLayerResizingControl state={state} shapeRef={shapeRef} />
    </>
  );
}

function KonvaLayerResizingControl({
  state,
  shapeRef,
}: {
  state: 'selected' | 'unselected';
  shapeRef: RefObject<Konva.Rect | null>;
}) {
  const { canvasConfigFront } = useTemplate();
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (state === 'selected' && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [shapeRef, state]);

  const boundBoxFunc: (oldBox: Box, newBox: Box) => Box = (_oldBox, newBox) => {
    // Limit resize
    const minWidth = 50;
    const minHeight = 50;
    const maxWidth = canvasConfigFront.width - newBox.x;
    const maxHeight = canvasConfigFront.height - newBox.y;

    // Calculate new dimensions
    const width = Math.max(minWidth, Math.min(newBox.width, maxWidth));
    const height = Math.max(minHeight, Math.min(newBox.height, maxHeight));

    return {
      ...newBox,
      width,
      height,
    };
  };

  if (state === 'selected') {
    return (
      <Transformer
        ref={transformerRef}
        rotateEnabled={false}
        boundBoxFunc={boundBoxFunc}
        enabledAnchors={[
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ]}
      />
    );
  }
}
