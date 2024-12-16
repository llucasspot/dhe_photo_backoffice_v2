import { ComponentProps, RefObject, useEffect, useRef } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Box } from 'konva/lib/shapes/Transformer';

import { useTemplate } from '../../context';
import { LayerConfig } from '../../types';

import { StateItemsController } from '#core/react';

type Positions = {
  x: number;
  y: number;
};

type Node = { x: () => number; y: () => number };

function getPositions(node: Node): Positions {
  return {
    x: node.x(),
    y: node.y(),
  };
}

export function Canvas() {
  const { layers, selectedLayerId, canvasConfig } = useTemplate();

  const handleStageClick = (event: KonvaEventObject<MouseEvent>) => {
    if (event.target === event.target.getStage()) {
      selectedLayerId.set(null);
    }
  };

  return (
    <div className="relative">
      <Stage
        height={canvasConfig.frontHeight}
        width={canvasConfig.frontWidth}
        style={{ border: '1px solid #ccc' }}
        onClick={handleStageClick}
      >
        <Layer>
          {StateItemsController.getAll(layers).map((layer) => (
            <KonvaLayer
              key={layer.id}
              layer={layer}
              state={
                layer.id === selectedLayerId.get ? 'selected' : 'unselected'
              }
              onClick={() => selectedLayerId.set(layer.id)}
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
  const { canvasConfig, layers } = useTemplate();
  const shapeRef = useRef<Konva.Rect>(null);

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

  const findNearestPosition = (positions: Positions): Positions => {
    const { x, y } = positions;

    const otherLayers = StateItemsController.getAll(layers).filter(
      (l) => l.id !== layer.id,
    );
    let finalX = x;
    let finalY = y;

    otherLayers.forEach((otherLayer) => {
      // Check horizontal overlap
      const horizontalOverlap =
        x < otherLayer.frontX + otherLayer.frontWidth &&
        x + layer.frontWidth > otherLayer.frontX;
      // Check vertical overlap
      const verticalOverlap =
        y < otherLayer.frontY + otherLayer.frontHeight &&
        y + layer.frontHeight > otherLayer.frontY;

      if (horizontalOverlap && verticalOverlap) {
        // Calculate distances to each edge of the other layer
        const distToRight = Math.abs(
          otherLayer.frontX + otherLayer.frontWidth - x,
        );
        const distToLeft = Math.abs(x + layer.frontWidth - otherLayer.frontX);
        const distToBottom = Math.abs(
          otherLayer.frontY + otherLayer.frontHeight - y,
        );
        const distToTop = Math.abs(y + layer.frontHeight - otherLayer.frontY);

        // Find the smallest distance
        const minDist = Math.min(
          distToRight,
          distToLeft,
          distToBottom,
          distToTop,
        );

        // Snap to the nearest edge
        if (minDist === distToRight) {
          finalX = otherLayer.frontX + otherLayer.frontWidth;
        } else if (minDist === distToLeft) {
          finalX = otherLayer.frontX - layer.frontWidth;
        } else if (minDist === distToBottom) {
          finalY = otherLayer.frontY + otherLayer.frontHeight;
        } else if (minDist === distToTop) {
          finalY = otherLayer.frontY - layer.frontHeight;
        }
      }
    });

    return { x: finalX, y: finalY };
  };

  function limitPositionsToCanvas(positions: Positions): Positions {
    return {
      x: Math.max(
        0,
        Math.min(positions.x, canvasConfig.frontWidth - layer.frontWidth),
      ),
      y: Math.max(
        0,
        Math.min(positions.y, canvasConfig.frontHeight - layer.frontHeight),
      ),
    };
  }

  const handleDragMove = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target;

    const { x, y } = limitPositionsToCanvas(
      findNearestPosition(getPositions(node)),
    );

    node.x(x);
    node.y(y);
  };

  const handleTransformEnd = () => {
    if (!shapeRef.current) return;

    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale to 1 and adjust width/height instead
    node.scaleX(1);
    node.scaleY(1);

    StateItemsController.update(layers, layer.id, {
      // x: node.x(),
      // y: node.y(),
      frontHeight: Math.max(node.height() * scaleY, 50), // Minimum height of 50
      frontWidth: Math.max(node.width() * scaleX, 50), // Minimum width of 50
    });
  };

  const onDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    const node = event.target;

    StateItemsController.update(layers, layer.id, {
      frontX: node.x(),
      frontY: node.y(),
    });
  };

  return (
    <>
      <Rect
        {...style}
        ref={shapeRef}
        data-id={layer.id}
        x={layer.frontX}
        y={layer.frontY}
        height={layer.frontHeight}
        width={layer.frontWidth}
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
  const { canvasConfig, layers } = useTemplate();
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (state === 'selected' && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [shapeRef, state]);

  const checkCollision = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const currentLayer = shapeRef.current;
    if (!currentLayer) return true;

    const currentLayerId = currentLayer.attrs['data-id'];

    return StateItemsController.getAll(layers).some((otherLayer) => {
      if (otherLayer.id === currentLayerId) return false;

      // Check if rectangles overlap
      const noOverlap =
        x + width <= otherLayer.frontX || // Current is left of other
        x >= otherLayer.frontX + otherLayer.frontWidth || // Current is right of other
        y + height <= otherLayer.frontY || // Current is above other
        y >= otherLayer.frontY + otherLayer.frontHeight; // Current is below other

      return !noOverlap;
    });
  };

  const boundBoxFunc: (oldBox: Box, newBox: Box) => Box = (oldBox, newBox) => {
    // Limit resize
    const minHeight = 50;
    const minWidth = 50;
    const maxHeight = canvasConfig.frontHeight - newBox.y;
    const maxWidth = canvasConfig.frontWidth - newBox.x;

    // Calculate new dimensions
    const height = Math.max(minHeight, Math.min(newBox.height, maxHeight));
    const width = Math.max(minWidth, Math.min(newBox.width, maxWidth));

    console.log(checkCollision(newBox.x, newBox.y, width, height));

    // Check if new dimensions would cause overlap
    if (checkCollision(newBox.x, newBox.y, width, height)) {
      // If overlap detected, keep old dimensions
      return oldBox;
    }

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

  return null;
}
